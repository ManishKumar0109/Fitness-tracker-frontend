
const TodaySummary = ({ mealsLogged, totalCalories, activeTime }) => {
  return (
    <div className="w-full min-w-0 h-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-center">
      <h2 className="text-lg sm:text-xl font-semibold text-white">
        Today's Summary
      </h2>

      <div className="flex justify-between items-center gap-3 py-4 border-b border-slate-800">
        <span className="text-sm sm:text-base text-slate-400">
          Meals logged
        </span>

        <span className="text-sm sm:text-base text-white font-semibold shrink-0">
          {mealsLogged}
        </span>
      </div>

      <div className="flex justify-between items-center gap-3 py-4 border-b border-slate-800">
        <span className="text-sm sm:text-base text-slate-400">
          Total calories
        </span>

        <span className="text-sm sm:text-base text-white font-semibold shrink-0">
          {totalCalories} kcal
        </span>
      </div>

      <div className="flex justify-between items-center gap-3 py-4">
        <span className="text-sm sm:text-base text-slate-400">
          Active time
        </span>

        <span className="text-sm sm:text-base text-white font-semibold shrink-0">
          {activeTime} min
        </span>
      </div>
    </div>
  );
};

export default TodaySummary;
