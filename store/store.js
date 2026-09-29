import { UserSlice } from "./slice/UserSlice";
import { ProfileSlice } from "./slice/ProfileSlice";
import { FoodSlice } from "./slice/FoodSlice";
import { ActivitySlice } from "./slice/ActivtitySlice";
import { create } from "zustand";

const useStore=create((set,get)=>({
    ...UserSlice(set,get),
    ...ActivitySlice(set,get),
    ...FoodSlice(set,get),
    ...ProfileSlice(set,get)
}))

export default useStore