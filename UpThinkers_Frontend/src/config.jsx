
export const config = {
    AUTH_BASE_URL: import.meta.env.VITE_APP_BASE_URL + '/auth',
    ADMIN_BASE_URL: import.meta.env.VITE_APP_ADMIN_API_URL,
    USER_BASE_URL: import.meta.env.VITE_APP_USER_API_URL,
    TUTOR_BASE_URL: import.meta.env.VITE_APP_TUTOR_API_URL,
    BASE_URL: import.meta.env.VITE_APP_BASE_URL,
    CLOUDINARY: import.meta.env.VITE_APP_CLOUDINARY,
    CLOUDINARY_PRESET_KEY: import.meta.env.VITE_APP_CLOUDINARY_PRESET_KEY,
    CLOUDINARY_API_KEY: import.meta.env.VITE_APP_CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: import.meta.env.VITE_APP_CLOUDINARY_API_SECRET,
    GOOGLE_CLIENT_ID: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
    GOOGLE_SECRET: import.meta.env.VITE_APP_GOOGLE_SECRET,
    PAYPAL_CLIENT_ID: import.meta.env.VITE_APP_PAYPAL_CLIENT_ID,
    PAYPAL_SECRET_ID: import.meta.env.VITE_APP_PAYPAL_SECRET_ID,
    RAZORPAY_ID_KEY: import.meta.env.VITE_APP_RAZORPAY_ID_KEY,
    RAZORPAY_SECRET_KEY: import.meta.env.VITE_APP_RAZORPAY_SECRET_KEY,
    ZEGO_APP_ID:import.meta.env.VITE_APP_ZEGO_APP_ID,
    ZEGO_SERVER_ID:import.meta.env.VITE_APP_ZEGO_SERVER_ID
};

console.log(config)