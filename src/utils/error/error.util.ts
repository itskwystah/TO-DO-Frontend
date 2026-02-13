import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const showError = (error: unknown) => {
    if (error && typeof error === "object" && "message" in error) {
        const AxiosError = error as AxiosError<{ message?: string}>;

        if (AxiosError.response?.data?.message) {
            toast.error(AxiosError.response.data.message);
        } else {
            toast.error(AxiosError.message || "An unexpected error occured. ");
        }
    } else {
        toast.error("An unexpected error occured. ");
    }
};