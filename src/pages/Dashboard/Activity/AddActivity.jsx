import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/lib/api-client";
import { ADD_ACTIVITY_ROUTE } from "../../../../constants";
import useStore from "../../../../store/store";

const AddActivity = () => {
  const [activityname, setActivityname] = useState("");
  const [duration, setDuration] = useState("");
  const [burn, setBurn] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [open, setOpen] = useState(false);
  const todayActivity=useStore((store)=>store.todayActivity)
  const saveTodayActivity=useStore((store)=>store.saveTodayActivity)

  const handleAddActivity = async () => {
    if (activityname.trim() === "" || duration === "" || burn === "") {
      alert("Please fill all entries");
      return;
    }

    try {
      const res = await api.post(ADD_ACTIVITY_ROUTE, {
        activityname,
        duration: Number(duration),
        burn: Number(burn),
      });

      if (res.data.success) {
        
        saveTodayActivity([...todayActivity,res.data.data])
       
        setActivityname("");
        setDuration("");
        setBurn("");
        setSelectedActivity("");
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-[22%] md:h-[25%] w-full md:w-[50%] mt-2 md:border-2 border-gray-800 rounded-2xl mx-auto flex flex-col items-center">
      <div className="md:h-[60%] h-[80%] w-full p-1 px-2">
        <h1 className="text-white text-lg font-semibold ms-2 mb-2">
          Select Activity
        </h1>

        <div className="w-full flex flex-wrap justify-center gap-2">
          <div
            onClick={() => {
              setSelectedActivity("Walking");
              setActivityname("Walking");
            }}
            className={`${
              selectedActivity === "Walking" ? "bg-slate-500" : "bg-slate-800"
            } hover:bg-slate-500 hover:cursor-pointer text-white h-9 px-2 flex items-center rounded-xl text-sm`}
          >
            🚶 Walking
          </div>

          <div
            onClick={() => {
              setSelectedActivity("Running");
              setActivityname("Running");
            }}
            className={`${
              selectedActivity === "Running" ? "bg-slate-500" : "bg-slate-800"
            } hover:bg-slate-500 hover:cursor-pointer text-white h-9 px-2 flex items-center rounded-xl text-sm`}
          >
            🏃 Running
          </div>

          <div
            onClick={() => {
              setSelectedActivity("Cycling");
              setActivityname("Cycling");
            }}
            className={`${
              selectedActivity === "Cycling" ? "bg-slate-500" : "bg-slate-800"
            } hover:bg-slate-500 hover:cursor-pointer text-white h-9 px-2 flex items-center rounded-xl text-sm`}
          >
            🚴 Cycling
          </div>

          <div
            onClick={() => {
              setSelectedActivity("Yoga");
              setActivityname("Yoga");
            }}
            className={`${
              selectedActivity === "Yoga" ? "bg-slate-500" : "bg-slate-800"
            } hover:bg-slate-500 hover:cursor-pointer text-white h-9 px-2 flex items-center rounded-xl text-sm`}
          >
            🧘 Yoga
          </div>

          <div
            onClick={() => {
              setSelectedActivity("Weight Training");
              setActivityname("Weight Training");
            }}
            className={`${
              selectedActivity === "Weight Training"
                ? "bg-slate-500"
                : "bg-slate-800"
            } hover:bg-slate-500 hover:cursor-pointer text-white h-9 px-2 flex items-center rounded-xl text-sm`}
          >
            🏋️ Weight Training
          </div>

          <div
            onClick={() => {
              setSelectedActivity("Custom");
              setActivityname("");
            }}
            className={`${
              selectedActivity === "Custom" ? "bg-slate-500" : "bg-slate-800"
            } hover:bg-slate-500 hover:cursor-pointer text-white h-9 px-2 flex items-center rounded-xl text-sm`}
          >
            ✨ Custom
          </div>
        </div>
      </div>

      <div className="p-1 flex-1 flex items-center justify-center w-[80%]">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="bg-green-400 text-white md:h-8 h-10 w-full rounded-md hover:bg-green-600">
            Add Activity
          </DialogTrigger>

          <DialogContent className="bg-slate-900 border border-slate-700 text-white sm:max-w-157.5">
            <DialogHeader>
              <DialogTitle className="text-lg">New Activity</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Activity Name */}
              <div className="space-y-2">
                <label className="text-sm">
                  Activity Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={activityname}
                  onChange={(e) => setActivityname(e.target.value)}
                  placeholder="e.g., Swimming"
                  className="w-full h-13 rounded-xl bg-slate-800 border border-slate-700 px-4 text-white placeholder:text-slate-500 outline-none focus:border-green-400"
                />
              </div>

              {/* Duration + Calories */}
              <div className="grid grid-cols-2 gap-4">
                {/* Duration */}
                <div className="space-y-2">
                  <label className="text-sm">
                    Duration (min) <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="30"
                    className="w-full h-13 rounded-xl bg-slate-800 border border-slate-700 px-4 text-white placeholder:text-slate-500 outline-none focus:border-green-400"
                  />
                </div>

                {/* Calories */}
                <div className="space-y-2">
                  <label className="text-sm">
                    Calories Burned <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="number"
                    value={burn}
                    onChange={(e) => setBurn(e.target.value)}
                    placeholder="300"
                    className="w-full h-13 rounded-xl bg-slate-800 border border-slate-700 px-4 text-white placeholder:text-slate-500 outline-none focus:border-green-400"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  className="h-13 rounded-xl bg-slate-800 text-white hover:bg-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleAddActivity}
                  className="h-13 rounded-xl bg-green-500 text-white hover:bg-green-600"
                >
                  Add Activity
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddActivity;
