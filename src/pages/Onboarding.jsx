import { useState, useEffect } from "react";
import { UserRound, Ruler, Target, Flame, Dumbbell } from "lucide-react";
import { api } from "@/lib/api-client";
import { CREATE_PROFILE_ROUTE ,GET_PROFILE_ROUTE } from "../../constants";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/store";

const Onboarding = () => {
  const navigate = useNavigate();
  const [Step, setStep] = useState(1);
  const [goal, setGoal] = useState(null);

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [calorieIntake, setCalorieIntake] = useState(2000);
  const [calorieBurn, setCalorieBurn] = useState(400);

  const saveProfileInfo = useStore((store) => store.saveProfileInfo);
  const profileInfo = useStore((store) => store.profileInfo);
  const userInfo = useStore((store) => store.userInfo);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const res = await api.get(GET_PROFILE_ROUTE);

        if (res.data.success) {
          saveProfileInfo(res.data.data);
          navigate("/");
        }
      } catch (err) {
      }
    };

    if (!profileInfo) {
      checkProfile();
    }
  }, [profileInfo, navigate, saveProfileInfo]);

  async function createprofile() {
    try {
      const res = await api.post(CREATE_PROFILE_ROUTE, {
        age,
        weight,
        height,
        goal,
        targetburn: calorieBurn,
        targetintake: calorieIntake,
      });

      if (res.data.success) {
        console.log("done set feildign");
        saveProfileInfo(res.data.data);
        navigate("/");
      }
    } catch (err) {
      if (err.response.status) {
        alert("something went wrong");
      }
    }
  }

  const handleSubmit = () => {
    if (
      age === "" ||
      weight === "" ||
      height === "" ||
      goal === null ||
      calorieIntake === "" ||
      calorieBurn === ""
    ) {
      alert("Please complete all fields");
      return;
    } else {
      createprofile();
    }
  };

  return (
    <>
      <div className="h-screen w-screen bg-[#020617] flex items-center justify-center px-4">
        <div className="lg:h-[90%] h-[80%] lg:w-[60%] md:w-[80%] w-full flex flex-col px-2 relative">
          <div className="h-[10%] text-white text-2xl font-bold">FitTrack</div>

          <div className="h-[15%] flex flex-col gap-3">
            <p className="text-gray-300 text-lg">
              Let's personalize your experience
            </p>

            <div className="flex gap-3">
              <div
                className={`${Step >= 1 ? "border-green-400" : "border-gray-700"} border-2 rounded-full w-52`}
                onClick={() => setStep(1)}
              ></div>

              <div
                className={`${Step >= 2 ? "border-green-400" : "border-gray-700"} border-2 rounded-full w-52`}
                onClick={() => setStep(2)}
              ></div>

              <div
                className={`${Step >= 3 ? "border-green-400" : "border-gray-700"} border-2 rounded-full w-52`}
                onClick={() => setStep(3)}
              ></div>
            </div>

            <p className="text-gray-400 text-sm">{`Step ${Step} of 3`}</p>
          </div>

          {/* AGE INPUT */}
          <div
            className={`min-h-[50%] ${Step == 1 ? "block" : "hidden"} w-full `}
          >
            <div className="px-2 flex items-center gap-2 ">
              <div className="text-green-400">
                <UserRound size={28} />
              </div>

              <div>
                <p className="text-md font-semibold text-white">
                  How old are you ?
                </p>

                <p className="text-sm font-semibold text-gray-300">
                  This helps us to personalize your experience
                </p>
              </div>
            </div>

            <p className="text-gray-200 font-semibold text-sm ml-1  mb-2 mt-5">
              Age<span className="text-red-500"> *</span>
            </p>

            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border-2 border-gray-500 text-white px-2 rounded-lg h-12 w-[75%]"
            />
          </div>

          {/* MEASUREMENT INPUT */}
          <div
            className={`min-h-[50%] ${Step == 2 ? "block" : "hidden"} w-full`}
          >
            <div className="px-2 flex gap-2 items-center">
              <div className="text-green-400">
                <Ruler size={28} />
              </div>

              <div>
                <p className="text-md font-semibold text-white">
                  Your measurements
                </p>

                <p className="text-sm font-semibold text-gray-300">
                  Help us track your progess
                </p>
              </div>
            </div>

            <div>
              <p className="text-gray-200 font-semibold text-sm ml-1 mb-2 mt-5">
                {"weight (kg)"} <span className="text-red-500"> *</span>
              </p>

              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="border-2 border-gray-500 text-white px-2 rounded-lg h-12 w-[75%]"
              />
            </div>

            <div>
              <p className="text-gray-200 font-semibold text-sm ml-1 mb-2 mt-5">
                {"height (cm)"}
                <span className="text-red-500"> *</span>
              </p>

              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="border-2 border-gray-500 text-white px-2 rounded-lg h-12 w-[75%]"
              />
            </div>
          </div>

          {/* WHAT IS YOUR GOAL */}
          <div
            className={`min-h-[50%] ${Step == 3 ? "block" : "hidden"} w-full`}
          >
            <div className="px-2 flex gap-2 items-center">
              <div className="text-green-400">
                <Target size={28} />
              </div>

              <div>
                <p className="text-md font-semibold text-white">
                  What is your goal ?
                </p>

                <p className="text-sm font-semibold text-gray-300">
                  we will tailor your experience
                </p>
              </div>
            </div>

            <div className="text-gray-100 pl-1 flex flex-col gap-2 py-4">
              <p
                onClick={() => setGoal(0)}
                className={`border-2 ${
                  goal == 0 ? "border-gray-300" : "border-gray-600"
                } bg-gray-800 w-[45%] font-semibold pl-2 rounded-md py-2`}
              >
                Lose Weight
              </p>

              <p
                onClick={() => setGoal(1)}
                className={`border-2 ${
                  goal == 1 ? "border-gray-300" : "border-gray-600"
                } bg-gray-800 w-[45%] font-semibold pl-2 rounded-md py-2`}
              >
                Maintain Weight
              </p>

              <p
                onClick={() => setGoal(2)}
                className={`border-2 ${
                  goal == 2 ? "border-gray-300" : "border-gray-600"
                } bg-gray-800 w-[45%] font-semibold pl-2 rounded-md py-2`}
              >
                Gain Muscle
              </p>
            </div>

            <div>
              <p className="text-gray-200 font-semibold text-sm ml-1 mb-2 mt-5">
                {"Daily Targets"}
                <span className="text-red-500"> *</span>
              </p>

              <div className="text-white pl-1 md:w-[45%] w-[70%] flex flex-col mb-4">
                <div className="w-full flex justify-between">
                  <p className="text-sm flex items-center gap-2">
                    <Flame size={16} className="text-orange-400" />
                    Daily calorie intake
                  </p>

                  <p className="text-sm text-green-400">{calorieIntake} kcal</p>
                </div>

                <input
                  type="range"
                  min="1000"
                  max="4000"
                  step="50"
                  value={calorieIntake}
                  onChange={(e) => setCalorieIntake(Number(e.target.value))}
                  className="block w-full accent-green-400"
                />
              </div>

              <div className="text-white pl-1 md:w-[45%] w-[70%] flex flex-col">
                <div className="w-full flex justify-between">
                  <p className="text-sm flex items-center gap-2">
                    <Dumbbell size={16} className="text-green-400" />
                    Daily calorie burn
                  </p>

                  <p className="text-sm text-green-400">{calorieBurn} kcal</p>
                </div>

                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={calorieBurn}
                  onChange={(e) => setCalorieBurn(Number(e.target.value))}
                  className="block w-full accent-green-400"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep((s) => s - 1)}
              className={`bg-green-500 absolute bottom-2 left-2 text-white px-4 ${
                Step > 1 ? "block" : "hidden"
              } py-2 rounded transition duration-300 hover:scale-101`}
            >
              Back
            </button>

            <button
              onClick={() => setStep((s) => s + 1)}
              className={`bg-green-500 text-white absolute right-2 bottom-2 px-4 ${
                Step <= 2 ? "block" : "hidden"
              } py-2 rounded transition duration-300 hover:scale-101`}
            >
              Forward
            </button>

            <button
              className={`bg-green-500 text-white absolute right-2 bottom-2 px-4 ${
                Step == 3 ? "block" : "hidden"
              } py-2 rounded transition duration-300 hover:scale-101`}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
