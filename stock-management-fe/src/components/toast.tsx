import { toast, ToastOptions, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (
  message: string,
  type: "success" | "error" | "info" | "warning",
  options: ToastOptions = {}
) => {
  const config = {
    position: "top-right" as ToastPosition,
    autoClose: 3000,
    ...options,
  };
  switch (type) {
    case "success":
      toast.success(message, config);
      break;
    case "error":
      toast.error(message, config);
      break;
    case "info":
      toast.info(message, config);
      break;
    case "warning":
      toast.warning(message, config);
      break;
    default:
      toast(message, config);
  }
};
