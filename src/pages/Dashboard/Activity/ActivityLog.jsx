import ActivityList from "./ActivityList";
import AddActivity from "./AddActivity";
import useStore from "../../../../store/store";

const ActivityLog = () => {
  const todayActivity = useStore((store) => store.todayActivity);

  let totatBurn = 0;

  if (todayActivity) {
    todayActivity.forEach((element) => {
      totatBurn += element.duration;
    });
  }
  return (
    <>
      <div className="bg-[#0f172a] h-[20%] py-4 px-6 flex items-center justify-between border-b border-slate-800">
        <div>
          <p className="text-2xl font-bold text-white">Activity Log</p>

          <p className="text-sm text-slate-400 mt-1">Track your workouts</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-400">Active Today</p>
          <p className="text-xl font-bold text-blue-400">{`${totatBurn} min`}</p>
        </div>
      </div>
      <AddActivity />
      <ActivityList />
    </>
  );
};

export default ActivityLog;
