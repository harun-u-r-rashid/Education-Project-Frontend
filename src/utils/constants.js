import UserData from "../views/plugin/UserData";


export const API_BASE_URL = `https://academy-platfrom-u6f9.onrender.com/api/`;
// export const API_BASE_URL = `http://127.0.0.1:8000/api/`;
export const userId = UserData()?.user_id;
export const isActive = UserData()?.is_active;

export const PAYPAL_CLIENT_ID = "test";

// export const teacherId = UserData()?.teacher_id; 