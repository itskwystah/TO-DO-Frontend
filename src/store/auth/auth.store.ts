import { loginApi, logoutApi, registerApi } from '@/api/auth/auth.api';
import type { AuthStoreType } from '@/types/auth/auth.type';
import { useTokenStore } from '@/store/token/token.store';
import { useAccountStore } from '@/store/account/account.store';
import { showError } from '@/utils/error/error.util';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useAuthStore = create<AuthStoreType>((set) => ({
  loading: false,
  setRegister: async (data) => {
    set({
      loading: true,
    });
    try {
      const response = await registerApi(data);
      console.log('Response: ', response);
      useTokenStore.getState().setToken(response.accessToken);
      await useAccountStore.getState().getAccount();
      toast.success(response.message);
      return true;
    } catch (error) {
      console.log(error);
      showError(error);
      return false;
    } finally {
      set({
        loading: false,
      });
    }
  },
  setLogin: async (data) => {
    set({ loading: true });
    try {
      const response = await loginApi(data);
      //console.log("login:", data);
      useTokenStore.getState().setToken(response.accessToken);
      await useAccountStore.getState().getAccount();
      toast.success(response.message);
      return true;
    } catch (error) {
      console.error(error);
      showError(error);
      return false;
    } finally {
      set({
        loading: false,
      });
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      const response = await logoutApi();
      useTokenStore.getState().setClearToken();
      useAccountStore.getState().clearAccount();
      toast.success(response.message);
      return true;
    } catch (error) {
      console.log(error);
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },
  initializeAuth: async () => {
    set({ loading: true });
    try {
      // Initialize token store first (checks for existing token)
      const tokenInitialized = await useTokenStore.getState().init();
      
      // If token exists, fetch the account
      if (tokenInitialized) {
        await useAccountStore.getState().getAccount();
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
    } finally {
      set({ loading: false });
    }
  },
}));