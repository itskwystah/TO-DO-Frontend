// src/api/auth/auth.api.ts

import axiosInstance from "@/axios/axios-instance";
import type { AcctType } from "@/types/account/account.type";

/* ======================================================
   Types
====================================================== */

interface MessageResponse {
  message: string;
}


interface AuthResponse extends MessageResponse {
  accessToken?: string;
}

/* ======================================================
   Authentication APIs
====================================================== */

export const registerApi = async (
  data: Partial<AcctType>
): Promise<AuthResponse> => {
  const { data: response } = await axiosInstance.post<AuthResponse>(
    "/auth/register",
    data
  );
  return response;
};

export const loginApi = async (
  data: Partial<AcctType>
): Promise<AuthResponse> => {
  const { data: response } = await axiosInstance.post<AuthResponse>(
    "/auth/login/",
    data
  );
  return response;
};

export const logoutApi = async (): Promise<MessageResponse> => {
  const { data: response } = await axiosInstance.post<MessageResponse>(
    "/auth/logout"
  );
  return response;
};

/* ======================================================
   Forgot Password Flow
====================================================== */

// Send OTP
export const sendForgotPasswordOtpApi = async (email: string): Promise<MessageResponse> => {
  const { data } = await axiosInstance.post<MessageResponse>(
    "/auth/forgot-password/send-otp",
    { email }
  );
  return data;
};

// Resend OTP
export const resendForgotPasswordOtpApi = async (email: string): Promise<MessageResponse> => {
  const { data } = await axiosInstance.post<MessageResponse>(
    "/auth/forgot-password/resend-otp",
    { email }
  );
  return data;
};

// Verify OTP
export const verifyForgotPasswordOtpApi = async (email: string, otp: string): Promise<MessageResponse> => {
  const { data } = await axiosInstance.post<MessageResponse>(
    "/auth/forgot-password/verify-otp",
    { email, otp }
  );
  return data;
};

// Reset Password
export const resetPasswordApi = async (
  email: string,
  otp: string,
  newPassword: string
): Promise<MessageResponse> => {
  const { data } = await axiosInstance.post<MessageResponse>(
    "/auth/forgot-password/reset",
    { email, otp, newPassword } // must match backend field
  );
  return data;
};

