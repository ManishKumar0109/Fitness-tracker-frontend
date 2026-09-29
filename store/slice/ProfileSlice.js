

export const ProfileSlice=(set,get)=>({
    profileInfo:null,
    saveProfileInfo:(value)=>set({profileInfo:value}),
    deleteProfileInfo:()=>set({profileInfo:null})

})