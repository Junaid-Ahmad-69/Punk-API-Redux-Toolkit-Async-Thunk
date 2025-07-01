import type {ToastT} from "sonner";
type ToastType = "success" | "error" | "info" | "warning" | "default";

export type ToasterMessageProps = {
    type: ToastType;
    message: string;
    description?: string;
    duration?: number;
    position?: ToastT["position"];
};