export const UserSlice = (set, get) => ({
  userInfo: null,
  isLoggedIn: false,
  saveUserInfo: (value) => set({ userInfo: value , isLoggedIn:true }),
  deleteUserInfo: () => set({ userInfo: null , isLoggedIn:false }),
});
