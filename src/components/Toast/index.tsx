import {toast} from "sonner";
import type {ToasterMessageProps} from "@/components/Toast/types.ts";

export const ToasterMessage = ({
type, message, description, duration = 4000, position = "top-right"}: ToasterMessageProps) => {
    const toastOptions = {
        description,
        duration,
        position,
    };

    switch (type) {
        case "success":
            return toast.success(message, toastOptions);
        case "error":
            return toast.error(message, toastOptions);
        case "info":
            return toast.info(message, toastOptions);
        case "warning":
            return toast.warning(message, toastOptions);
        default:
            return toast(message, toastOptions);
    }
};