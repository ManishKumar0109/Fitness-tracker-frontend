import {
  UserRound,
  Calendar,
  Scale,
  Ruler,
  Target,
  LogOut,
} from "lucide-react";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import useStore from "../../../../store/store";
import { UPDATE_PROFILE_ROUTE } from "../../../../constants";
import { useState } from "react";

const ProfileCard = () => {
  const profileInfo = useStore((store) => store.profileInfo);
  const saveProfileInfo = useStore(
    (store) => store.saveProfileInfo
  );

  const [age, setAge] = useState(profileInfo?.age || "");
  const [weight, setWeight] = useState(profileInfo?.weight || "");
  const [height, setHeight] = useState(profileInfo?.height || "");
  const [goal, setGoal] = useState(profileInfo?.goal ?? 0);
  const [targetintake, setTargetintake] = useState(
    profileInfo?.targetintake || ""
  );
  const [targetburn, setTargetburn] = useState(
    profileInfo?.targetburn || ""
  );

  const goalText = {
    0: "Lose Fat",
    1: "Maintain Weight",
    2: "Gain Muscle",
  };

  const updateProfile = async () => {
    try {
      const res = await api.put(UPDATE_PROFILE_ROUTE, {
        age,
        weight,
        height,
        goal,
        targetintake,
        targetburn,
      });

      if (res.data.success) {
        saveProfileInfo(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5">

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-emerald-500 p-3 rounded-xl text-white">
          <UserRound size={22} />
        </div>

        <div>
          <h2 className="text-white font-semibold">Your Profile</h2>
          <p className="text-xs text-slate-400">
            Member since 22/01/2026
          </p>
        </div>
      </div>

      {/* Age */}
      <div className="bg-slate-800 rounded-xl p-3 flex items-center gap-3 mb-3">
        <div className="bg-blue-500/10 text-blue-400 p-3 rounded-lg">
          <Calendar size={18} />
        </div>

        <div>
          <p className="text-xs text-slate-400">Age</p>
          <p className="text-sm font-semibold text-white">
            {profileInfo?.age} years
          </p>
        </div>
      </div>

      {/* Weight */}
      <div className="bg-slate-800 rounded-xl p-3 flex items-center gap-3 mb-3">
        <div className="bg-purple-500/10 text-purple-400 p-3 rounded-lg">
          <Scale size={18} />
        </div>

        <div>
          <p className="text-xs text-slate-400">Weight</p>
          <p className="text-sm font-semibold text-white">
            {profileInfo?.weight} kg
          </p>
        </div>
      </div>

      {/* Height */}
      <div className="bg-slate-800 rounded-xl p-3 flex items-center gap-3 mb-3">
        <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-lg">
          <Ruler size={18} />
        </div>

        <div>
          <p className="text-xs text-slate-400">Height</p>
          <p className="text-sm font-semibold text-white">
            {profileInfo?.height} cm
          </p>
        </div>
      </div>

      {/* Goal */}
      <div className="bg-slate-800 rounded-xl p-3 flex items-center gap-3 mb-3">
        <div className="bg-orange-500/10 text-orange-400 p-3 rounded-lg">
          <Target size={18} />
        </div>

        <div>
          <p className="text-xs text-slate-400">Goal</p>
          <p className="text-sm font-semibold text-white">
            {goalText[profileInfo?.goal]}
          </p>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog>
        <DialogTrigger className="w-full bg-slate-800 text-white rounded-xl py-3 hover:bg-slate-700 transition">
          Edit Profile
        </DialogTrigger>

        <DialogContent className="bg-slate-900 border border-slate-800 text-white sm:max-w-150">
          <DialogHeader>
            <DialogTitle className="text-lg">
              Edit Profile
            </DialogTitle>

            <DialogDescription className="text-slate-400">
              Update your profile information.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">

            {/* Age */}
            <div className="space-y-2">
              <label className="text-sm text-white">Age</label>

              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full h-12 rounded-xl bg-slate-800 border border-slate-700 px-4 text-white outline-none focus:border-emerald-400"
              />
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <label className="text-sm text-white">
                Weight (kg)
              </label>

              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full h-12 rounded-xl bg-slate-800 border border-slate-700 px-4 text-white outline-none focus:border-emerald-400"
              />
            </div>

            {/* Height */}
            <div className="space-y-2">
              <label className="text-sm text-white">
                Height (cm)
              </label>

              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full h-12 rounded-xl bg-slate-800 border border-slate-700 px-4 text-white outline-none focus:border-emerald-400"
              />
            </div>

            {/* Goal */}
            <div className="space-y-2">
              <label className="text-sm text-white">Goal</label>

              <select
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                className="w-full h-12 rounded-xl bg-slate-800 border border-slate-700 px-4 text-white outline-none focus:border-emerald-400"
              >
                <option value={0}>Lose Fat</option>
                <option value={1}>Maintain Weight</option>
                <option value={2}>Gain Muscle</option>
              </select>
            </div>

            {/* Target Intake */}
            <div className="space-y-2">
              <label className="text-sm text-white">
                Daily Calorie Intake
              </label>

              <input
                type="number"
                value={targetintake}
                onChange={(e) => setTargetintake(e.target.value)}
                className="w-full h-12 rounded-xl bg-slate-800 border border-slate-700 px-4 text-white outline-none focus:border-emerald-400"
              />
            </div>

            {/* Target Burn */}
            <div className="space-y-2">
              <label className="text-sm text-white">
                Daily Calorie Burn
              </label>

              <input
                type="number"
                value={targetburn}
                onChange={(e) => setTargetburn(e.target.value)}
                className="w-full h-12 rounded-xl bg-slate-800 border border-slate-700 px-4 text-white outline-none focus:border-emerald-400"
              />
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">

              <Button
                type="button"
                variant="secondary"
                className="h-12 bg-slate-800 text-white hover:bg-slate-700"
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={updateProfile}
                className="h-12 bg-emerald-500 text-white hover:bg-emerald-600"
              >
                Save Changes
              </Button>

            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Logout */}
      <button className="w-full mt-2 bg-red-500/10 text-red-400 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-red-500/20 transition">
        <LogOut size={18} />
        Logout
      </button>

    </div>
  );
};

export default ProfileCard;