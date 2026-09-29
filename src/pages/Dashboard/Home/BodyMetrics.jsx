
const BodyMetrics = ({ height, weight }) => {
  const bmi = weight / (height / 100) ** 2;

  return (
    <div className="w-full min-w-0 h-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-center">
      <h2 className="text-lg sm:text-xl font-semibold text-white">
        Body Metrics
      </h2>

      <p className="text-sm sm:text-base text-slate-500 mt-1">
        Your stats
      </p>

      <div className="flex justify-between items-center gap-3 min-w-0 mt-5 sm:mt-6">
        <span className="text-sm sm:text-base text-slate-400">
          Weight
        </span>

        <span className="text-sm sm:text-base text-white font-semibold shrink-0">
          {weight} kg
        </span>
      </div>

      <div className="flex justify-between items-center gap-3 min-w-0 mt-4">
        <span className="text-sm sm:text-base text-slate-400">
          Height
        </span>

        <span className="text-sm sm:text-base text-white font-semibold shrink-0">
          {height} cm
        </span>
      </div>

      <div className="border-t border-slate-800 mt-5 sm:mt-6 pt-4 flex justify-between items-center gap-3 min-w-0">
        <span className="text-sm sm:text-base text-slate-300">
          BMI
        </span>

        <span className="text-lg sm:text-xl text-emerald-400 font-semibold shrink-0">
          {bmi.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default BodyMetrics;
