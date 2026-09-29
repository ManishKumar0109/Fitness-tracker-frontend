import AddFood from "./AddFood";
import FoodList from "./FoodList";
import useStore from "../../../../store/store";
const FoodLog = () => {
  const todayFood = useStore((store) => store.todayFood);

  let totatIntake = 0;

  if (todayFood) {
    todayFood.forEach((element) => {
      totatIntake += element.intake;
    });
  }

  return (
    <>
      <div className="bg-[#0f172a] h-[20%] p-6 flex items-center justify-between border-b border-slate-800">
        <div>
          <p className="text-2xl font-bold text-white">Food Log</p>

          <p className="text-sm text-slate-400 mt-1">Track your daily intake</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-400">Today's Total</p>

          <p className="text-xl font-bold text-emerald-400">{`${totatIntake} kcal`}</p>
        </div>
      </div>
      <AddFood />
      <FoodList />
    </>
  );
};
export default FoodLog;
