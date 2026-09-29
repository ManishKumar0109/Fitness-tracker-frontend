import { Coffee, Utensils, Moon, Cookie, Trash2 } from "lucide-react";
import useStore from "../../../../store/store";

const icons = {
  breakfast: Coffee,
  lunch: Utensils,
  dinner: Moon,
  snack: Cookie,
};

import { api } from "@/lib/api-client";
import { DELETE_FOOD_ROUTE } from "../../../../constants";


const MealCard = ({ type, kcal, name, onDelete, foodId }) => {
  const Icon = icons[type];

  const handleDelete = async () => {
    try {
      const res = await api.delete(DELETE_FOOD_ROUTE.replace(":id", foodId));

      if (res.data.success) {
      onDelete(foodId);
      
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full bg-slate-900 border md:scale-85 scale-95 shadow-sm shadow-blue-500/20 border-slate-800 rounded-2xl p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 text-orange-500 p-3 rounded-xl">
            <Icon size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white capitalize">
              {type}
            </h2>

            <p className="text-sm text-slate-400">1 item</p>
          </div>
        </div>

        <p className="text-lg font-semibold text-white">{kcal} kcal</p>
      </div>

      <div className="mt-4 bg-slate-800 rounded-xl p-4 flex justify-between items-center gap-3">
        <p className="text-white capitalize truncate">{name}</p>

        <div className="flex items-center gap-4 shrink-0">
          <p className="text-slate-300">{kcal} kcal</p>

          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300 hover:cursor-pointer"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

const FoodList = () => {
  const Foodlist = useStore((store) => store.todayFood);
  const saveTodayFood=useStore((store)=>store.saveTodayFood)
  function onDelete(id) {
    const newlist = Foodlist.filter((el) => el._id !== id);
    saveTodayFood(newlist);
  }

  return (
    <div className="h-[55%] mt-4 rounded-xl border-2 border-gray-800 custom-scrollbar overflow-y-auto p-2 flex flex-col gap-1  bg-gray-900  w-full md:w-[50%] mx-auto">
      {!Foodlist || Foodlist.length == 0 ? (
        <div className="text-white  text-lg font-semibold h-full flex justify-center items-center">
          No Food Item Added Today
        </div>
      ) : (
        Foodlist.map((el) => {
          return (
            <MealCard
              key={el._id}
              foodId={el._id}
              type={el.mealtype}
              kcal={el.intake}
              name={el.foodname}
              onDelete={onDelete}
            />
          );
        })
      )}
    </div>
  );
};

export default FoodList;
