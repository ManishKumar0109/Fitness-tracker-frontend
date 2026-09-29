// Auth
export const SIGNUP_ROUTE = "api/auth/signup";
export const LOGIN_ROUTE = "api/auth/login";

// User
export const GET_USER_ROUTE = "api/auth/getuser";

// Profile
export const CREATE_PROFILE_ROUTE = "api/profile/createprofile";
export const GET_PROFILE_ROUTE = "api/profile/getprofile";
export const UPDATE_PROFILE_ROUTE = "api/profile/updateprofile";

// Food
export const ADD_FOOD_ROUTE = "api/food/addfood";//post
export const ADD_FOOD_IMAGE_ROUTE = "api/food/scanfood";//post
export const GET_FOOD_ROUTE = "api/food/getfood";
export const DELETE_FOOD_ROUTE = "api/food/:id";

// Activity
export const ADD_ACTIVITY_ROUTE = "api/activity/addactivity"; //post
export const GET_ACTIVITY_ROUTE = "api/activity/getactivity";
export const DELETE_ACTIVITY_ROUTE = "api/activity/:id";

export const HOST = import.meta.env.VITE_SERVER_URL;