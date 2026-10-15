import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import useStore from "../../../store/store";
import { Activity, useEffect } from "react";
import {
  GET_PROFILE_ROUTE,
  GET_ACTIVITY_ROUTE,
  GET_FOOD_ROUTE,
} from "../../../constants";
import { api } from "@/lib/api-client";

const DashBoard = () => {
  const profileInfo = useStore((store) => store.profileInfo);
  const saveProfileInfo = useStore((store) => store.saveProfileInfo);

  const todayFood = useStore((store) => store.todayFood);
  const weeklyFood = useStore((store) => store.weeklyFood);
  const saveTodayFood = useStore((store) => store.saveTodayFood);
  const saveWeeklyFood = useStore((store) => store.saveWeeklyFood);

  const todayActivity = useStore((store) => store.todayActivity);
  const weeklyActivity = useStore((store) => store.weeklyActivity);
  const saveTodayActivity = useStore((store) => store.saveTodayActivity);
  const saveWeeklyActivity = useStore((store) => store.saveWeeklyActivity);

  const navigate = useNavigate();

  //profile
  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        const res = await api.get(GET_PROFILE_ROUTE);

        if (res.data.success) {
          saveProfileInfo(res.data.data);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          navigate("/onboarding");
        }
      }
    };

    if (!profileInfo) {
      getProfileInfo();
    }
  }, [profileInfo, navigate, saveProfileInfo]);

  //food
  useEffect(() => {
    const getFoodInfo = async () => {
      try {
        const res = await api.get(GET_FOOD_ROUTE);
        if (res.data.success) {
          saveTodayFood(res.data.data.today);
          saveWeeklyFood(res.data.data.weekly);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (todayFood === null || weeklyFood === null) {
      getFoodInfo();
    }
  }, [todayFood, weeklyFood]);

  //Activity
  useEffect(() => {
    const getActivityInfo = async () => {
      try {
        const res = await api.get(GET_ACTIVITY_ROUTE);
        if (res.data.success) {
          saveTodayActivity(res.data.data.today);
          saveWeeklyActivity(res.data.data.weekly);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (todayActivity === null || weeklyActivity === null) {
      getActivityInfo();
    }
  }, [todayActivity, weeklyActivity]);

  if (!profileInfo) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <div className="h-screen w-screen relative bg-[#020617] flex flex-col-reverse md:flex-row">
        <Navbar />

        <div className="flex-1 h-full scroll-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
