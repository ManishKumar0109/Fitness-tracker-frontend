import { Timer, Trash2 } from "lucide-react";
import useStore from "../../../../store/store";

import { api } from "@/lib/api-client";
import { DELETE_ACTIVITY_ROUTE } from "../../../../constants";

const ActivityCard = ({ type, minutes, time, kcal, onDelete, activityId }) => {
  const handleDelete = async () => {
    try {
      const res = await api.delete(
        DELETE_ACTIVITY_ROUTE.replace(":id", activityId),
      );

      if (res.data.success) {
        onDelete(activityId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full bg-slate-800 rounded-xl p-3 flex items-center justify-between gap-3 shadow-md shadow-blue-500/10">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="bg-blue-500/10 text-blue-400 p-3 rounded-xl shrink-0">
          <Timer size={20} />
        </div>

        <div className="min-w-0">
          <p className="text-white font-medium capitalize truncate">{type}</p>

          <p className="text-xs text-slate-400">{time}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="text-right">
          <p className="text-white font-semibold">{minutes} min</p>

          <p className="text-xs text-slate-400">{kcal} kcal</p>
        </div>

        <button
          onClick={handleDelete}
          className="text-red-400 hover:text-red-300 hover:cursor-pointer"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
};

const ActivityList = () => {
  const activitylist = useStore((store) => store.todayActivity);
  const saveTodayActivity = useStore((store) => store.saveTodayActivity);

  function onDelete(id) {
    const newlist = activitylist.filter((el) => el._id !== id);

    saveTodayActivity(newlist);
  }

  return (
    <div className="h-[45%] mt-4 rounded-xl border-2 custom-scrollbar border-gray-800 overflow-y-auto p-2 flex flex-col gap-2  bg-gray-900  w-full md:w-[50%] mx-auto">
      {!activitylist || activitylist.length === 0 ? (
        <div className="text-white  text-lg font-semibold h-full flex justify-center items-center">
          No Activity Added Today
        </div>
      ) : (
        activitylist.map((el) => {
          return (
            <ActivityCard
              key={el._id}
              activityId={el._id}
              kcal={el.burn}
              onDelete={onDelete}
              time={new Date(el.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              type={el.activityname}
              minutes={el.duration}
            />
          );
        })
      )}
    </div>
  );
};

export default ActivityList;
