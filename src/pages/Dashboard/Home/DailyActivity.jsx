import { Activity, Zap } from "lucide-react";


const DailyActivity = ({ minutes, activities }) => {
  return (
    <div className="flex flex-col sm:flex-row md:h-auto  h-full  ">
      {/* Active */}
      <div className="md:flex-1 bg-slate-900 border border-slate-800 md:h-auto md:w-auto h-[40%] rounded-2xl p-4 sm:p-6 scale-90">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-13 h-13 bg-blue-100 rounded-xl flex items-center justify-center">
            <Activity className="w-7 h-7 text-blue-500" />
          </div>

          <p className="text-slate-500 text-base sm:text-lg">Active</p>
        </div>

        <div className="mt-5 sm:mt-6">
          <p className="text-white text-2xl sm:text-3xl font-bold">{minutes}</p>

          <p className="text-slate-400 text-sm sm:text-base mt-1">
            minutes today
          </p>
        </div>
      </div>

      {/* Workouts */}
      <div className="md:flex-1 bg-slate-900 border border-slate-800 h-[40%] w-full rounded-2xl p-4 sm:p-6 scale-90">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-13 h-13 bg-purple-100 rounded-xl flex items-center justify-center">
            <Zap className="w-7 h-7 text-purple-500" />
          </div>

          <p className="text-slate-500 text-base sm:text-lg">Workouts</p>
        </div>

        <div className="mt-5 sm:mt-6">
          <p className="text-white text-2xl sm:text-3xl font-bold">
            {activities}
          </p>

          <p className="text-slate-400 text-sm sm:text-base mt-1">
            activities logged
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyActivity;