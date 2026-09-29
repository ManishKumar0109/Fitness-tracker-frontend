import Header from "./Header";
import CalorieCard from "./CalorieCard";
import DailyActivity from "./DailyActivity";
import BodyMetrics from "./BodyMetrics";
import useStore from "../../../../store/store";
import TodaySummary from "./TodaySummary";
import Chart from "./Chart";

const Home = () => {
  const todayActivity = useStore((store) => store.todayActivity);
  const todayFood = useStore((store) => store.todayFood);
  const profileInfo = useStore((store) => store.profileInfo);

  let weight = 0;
  let height = 0;

  let totalActivitesNumber = 0;
  let totalFoodNumber = 0;
  let totalActivitesDuration = 0;

  let totalIntake = 0;
  let totalBurn = 0;

  let targetBurn = 0;
  let targetIntake = 0;

  if (todayActivity) {
    totalActivitesNumber = todayActivity.length;
    todayActivity.map((el) => {
      totalActivitesDuration += el.duration;
      totalBurn += el.burn;
    });
  }

  if (todayFood) {
    totalFoodNumber = todayFood.length;
    todayFood.map((el) => {
      totalIntake += el.intake;
    });
  }

  if (profileInfo) {
    weight = profileInfo.weight;
    height = profileInfo.height;
    targetBurn = profileInfo.targetburn;
    targetIntake = profileInfo.targetintake;
  }

  return (
    <div className="h-full w-full flex flex-col items-center pb-0.5 md:pb-2 ">
      <Header />

      <div className="md:flex-1 h-[64%] custom-scrollbar   overflow-y-auto w-[94%] md:w-[70%] md:px-4 px-0 md:pt-4 pt-0 ">
        <div className="w-full md:h-[50%] h-auto  ">
          <CalorieCard
            caloriesConsumed={totalIntake}
            calorieLimit={targetIntake}
            caloriesBurned={totalBurn}
            calorieGoal={targetBurn}
          />
        </div>

        <div className="w-full md:h-[40%]  h-auto ">
          <DailyActivity
            minutes={totalActivitesDuration}
            activities={totalActivitesNumber}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0 mt-4">
          <BodyMetrics height={height} weight={weight} />

          <TodaySummary
            mealsLogged={totalFoodNumber}
            totalCalories={totalIntake}
            activeTime={totalActivitesDuration}
          />
        </div>

        <div className=" h-[70%] mt-6   w-full">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Home;
