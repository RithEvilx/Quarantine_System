import FallBackImage from "/imgs/fallback_image.webp";
import KHQR_IMAGE from "/imgs/aba-merchant-qr.jpg";

// eslint-disable-next-line react-refresh/only-export-components
export const fallBackImage = FallBackImage;

export const APP_API_URL = import.meta.env.VITE_APP_API_URL;

export const APP_NAME = import.meta.env.VITE_APP_NAME;

// eslint-disable-next-line react-refresh/only-export-components
export const KHQR_QR_IMAGE = import.meta.env.VITE_KHQR_QR_IMAGE || KHQR_IMAGE;
