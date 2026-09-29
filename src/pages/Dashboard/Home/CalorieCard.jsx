import { Flame, Utensils } from "lucide-react";

const CalorieCard = ({
  caloriesConsumed,
  calorieLimit,
  caloriesBurned,
  calorieGoal,
}) => {
  const caloriesDifference = calorieLimit - caloriesConsumed;
  const burnDifference = calorieGoal - caloriesBurned;

  const consumedPercentage =
    calorieLimit > 0 ? (caloriesConsumed / calorieLimit) * 100 : 0;

  const burnedPercentage =
    calorieGoal > 0 ? (caloriesBurned / calorieGoal) * 100 : 0;

  return (
    <div className="bg-slate-900 rounded-xl p-3 sm:p-4 text-white">
      {/* Calories Consumed */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-orange-100 text-orange-500 p-2 rounded-lg">
            <Utensils size={20} />
          </div>

          <div>
            <p className="text-xs text-slate-400">Calories Consumed</p>

            <p className="text-base sm:text-lg font-semibold">
              {caloriesConsumed} kcal
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-400">Limit</p>

          <p className="text-sm font-medium">{calorieLimit}</p>
        </div>
      </div>

      {/* Consumed Progress */}
      <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full"
          style={{
            width: `${Math.min(consumedPercentage, 100)}%`,
          }}
        />
      </div>

      {/* Remaining / Target Reached */}
      <div className="flex justify-between mt-3">
        <span className="text-xs text-emerald-400">
          {caloriesDifference > 0
            ? `${caloriesDifference} kcal left to reach your limit`
            : "You've reached the target"}
        </span>
      </div>

      <div className="border-t border-slate-800 my-3" />

      {/* Calories Burned */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-orange-100 text-orange-500 p-2 rounded-lg">
            <Flame size={20} />
          </div>

          <div>
            <p className="text-xs text-slate-400">Calories Burned</p>

            <p className="text-base sm:text-lg font-semibold">
              {caloriesBurned} kcal
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-400">Goal</p>

          <p className="text-sm font-medium">{calorieGoal}</p>
        </div>
      </div>

      {/* Burned Progress */}
      <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-500 rounded-full"
          style={{
            width: `${Math.min(burnedPercentage, 100)}%`,
          }}
        />
      </div>

      {/* Burning Left / Target Reached */}
      <div className="flex justify-between mt-3">
        <span className="text-xs text-slate-400">
          {burnDifference > 0
            ? `${burnDifference} kcal left to hit your goal`
            : "You've reached the target"}
        </span>
      </div>
    </div>
  );
};

export default CalorieCard;
