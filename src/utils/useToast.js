import { toast } from "react-toastify";

const defaultToastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const useToast = () => {
  const showSuccess = (message, config = {}) =>
    toast.success(`✅ ${message}`, { ...defaultToastConfig, ...config });

  const showError = (message, config = {}) =>
    toast.error(`❌ ${message}`, { ...defaultToastConfig, ...config });

  const showInfo = (message, config = {}) =>
    toast.info(`ℹ️ ${message}`, { ...defaultToastConfig, ...config });

  const showWarning = (message, config = {}) =>
    toast.warn(`⚠️ ${message}`, { ...defaultToastConfig, ...config });

  const showLoading = (message, config = {}) =>
    toast.loading(`⏳ ${message}`, { ...defaultToastConfig, ...config });

  const updateToast = (id, options) =>
    toast.update(id, { ...options, ...defaultToastConfig });

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showLoading,
    updateToast,
  };
};
