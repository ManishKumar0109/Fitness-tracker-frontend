import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Sparkles } from "lucide-react";
import FoodScan from "./FoodScan";
import { useState } from "react";
import useStore from "../../../../store/store";
import { api } from "@/lib/api-client";
import { ADD_FOOD_IMAGE_ROUTE, ADD_FOOD_ROUTE } from "../../../../constants";

const AddFood = () => {
  const [mealType, setMealType] = useState("");
  const [foodname, setFoodname] = useState("");
  const [intake, setIntake] = useState("");
  const [open, setOpen] = useState(false);

  const [isScanning, setIsScanning] = useState(false);

  const todayFood = useStore((store) => store.todayFood);
  const saveTodayFood = useStore((store) => store.saveTodayFood);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Check meal type
    if (mealType === "") {
      alert("Please select a meal type first");
      e.target.value = "";
      return;
    }

    const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];

    // Check format
    if (!allowedFormats.includes(file.type)) {
      alert("Only JPG, JPEG and PNG images are allowed");
      e.target.value = "";
      return;
    }

    // Check size
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5 MB");
      e.target.value = "";
      return;
    }

    // Everything is valid → send image to backend
    try {
      setIsScanning(true);
      const formData = new FormData();

      formData.append("image", file);
      formData.append("mealtype", mealType);

      const res = await api.post(ADD_FOOD_IMAGE_ROUTE, formData);
      console.log(res);

      if (res.data.success) {
        console.log("Image uploaded successfully");
        saveTodayFood([...todayFood, res.data.data]);

        setMealType("");
        console.log(res.data.data);
      }
    } catch (err) {
      console.log(err.response);
      alert("something went wrong . please try again later .");
    } finally {
      setIsScanning(false);
    }
  };

  const handleAddFood = async () => {
    if (foodname.trim() === "" || intake === "" || mealType === "") {
      alert("Please fill all entries");
      return;
    }

    try {
      const res = await api.post(ADD_FOOD_ROUTE, {
        foodname,
        intake: Number(intake),
        mealtype: mealType,
      });

      if (res.data.success) {
        console.log(res.data.data);

        saveTodayFood([...todayFood, res.data.data]);

        setMealType("");
        setFoodname("");
        setIntake("");
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isScanning ? (
        <FoodScan />
      ) : (
        <div className="h-[15%] md:h-[20%] w-full md:w-[50%] mt-2 md:border-2 border-gray-800 rounded-2xl mx-auto flex flex-col items-center">
          <div className="md:h-[60%] h-[80%] w-full p-1 px-2">
            <h1 className="text-white text-lg font-semibold ms-2 mb-1">
              Type of meal
            </h1>

            <div className="w-full flex md:gap-2 gap-1 mx-auto">
              <div
                onClick={() => setMealType("breakfast")}
                className={`${
                  mealType === "breakfast" ? "bg-slate-500" : "bg-slate-800"
                } hover:bg-slate-500 hover:cursor-pointer text-white h-9 w-auto p-2 flex justify-between items-center text-sm md:text-lg rounded-xl`}
              >
                🥐 breakfast
              </div>

              <div
                onClick={() => setMealType("lunch")}
                className={`${
                  mealType === "lunch" ? "bg-slate-500" : "bg-slate-800"
                } hover:bg-slate-500 hover:cursor-pointer text-white h-9 w-auto p-2 flex justify-between items-center text-sm md:text-lg rounded-xl`}
              >
                🍱 lunch
              </div>

              <div
                onClick={() => setMealType("dinner")}
                className={`${
                  mealType === "dinner" ? "bg-slate-500" : "bg-slate-800"
                } hover:bg-slate-500 hover:cursor-pointer text-white h-9 w-auto p-2 flex justify-between items-center text-sm md:text-lg rounded-xl`}
              >
                🌙 dinner
              </div>

              <div
                onClick={() => setMealType("snack")}
                className={`${
                  mealType === "snack" ? "bg-slate-500" : "bg-slate-800"
                } hover:bg-slate-500 hover:cursor-pointer text-white h-9 w-auto p-2 flex justify-between items-center text-sm md:text-lg rounded-xl`}
              >
                🍪 snack
              </div>
            </div>
          </div>

          <div className="p-1 flex-1 flex items-center justify-center flex-row gap-2 w-[80%] min-w-0">
            {/* Normal Add Food */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className="bg-green-400 text-white rounded-md w-full flex-1 min-w-0 hover:bg-green-600 flex items-center justify-center gap-1 px-2 py-1 text-sm whitespace-nowrap overflow-hidden">
                <Plus size={22} className="text-white" />
                Add Food
              </DialogTrigger>

              <DialogContent className="bg-slate-900 border-slate-700 text-white sm:max-w-150">
                <DialogHeader>
                  <DialogTitle className="text-xl">New Food Entry</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  {/* Food Name */}
                  <div className="space-y-2">
                    <label className="text-sm">
                      Food Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={foodname}
                      onChange={(e) => setFoodname(e.target.value)}
                      placeholder="e.g., Grilled Chicken Salad"
                      className="w-full h-13 rounded-xl bg-slate-800 border border-slate-700 px-4 text-white placeholder:text-slate-500 outline-none focus:border-green-400"
                    />
                  </div>

                  {/* Calories */}
                  <div className="space-y-2">
                    <label className="text-sm">
                      Calories {"(kcal)"}{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="number"
                      value={intake}
                      onChange={(e) => setIntake(e.target.value)}
                      className="w-full h-13 rounded-xl bg-slate-800 border border-slate-700 px-4 text-white outline-none focus:border-green-400"
                    />
                  </div>

                  {/* Meal Type */}
                  <div className="space-y-2">
                    <label className="text-sm">
                      Meal Type <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={mealType}
                      onChange={(e) => setMealType(e.target.value)}
                      className="w-full h-13 rounded-xl bg-slate-800 border border-slate-700 px-4 text-white outline-none focus:border-green-400"
                    >
                      <option value="" disabled>
                        Select meal type
                      </option>

                      <option value="breakfast">🌅 Breakfast</option>
                      <option value="lunch">🌞 Lunch</option>
                      <option value="dinner">🌙 Dinner</option>
                      <option value="snack">🍪 Snack</option>
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="secondary"
                      className="flex-1 h-13 bg-slate-800 hover:bg-slate-700 text-white"
                    >
                      Cancel
                    </Button>

                    <Button
                      type="button"
                      onClick={handleAddFood}
                      className="flex-1 h-13 bg-green-500 hover:bg-green-600 text-white"
                    >
                      Add Entry
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* AI Add */}
            <label
              htmlFor="foodsnap"
              className="bg-green-400 rounded-md w-full flex-1 min-w-0 hover:bg-green-600 flex items-center justify-center gap-1 px-2 py-1 text-sm whitespace-nowrap overflow-hidden"
            >
              <Sparkles size={22} className="text-white" />
              <span className="text-white">Add Food Entry</span>
            </label>

            <input
              id="foodsnap"
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddFood;
