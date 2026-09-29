import useStore from "../../../../store/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const weeklyActivity = useStore((store) => store.weeklyActivity);
  const weeklyFood = useStore((store) => store.weeklyFood);

  const graphData = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const dateKey = date.toLocaleDateString("en-CA");

    let consumed = 0;
    let burned = 0;

    if (weeklyFood) {
      weeklyFood.forEach((el) => {
        const foodDate = new Date(el.createdAt).toLocaleDateString("en-CA");

        if (foodDate === dateKey) {
          consumed += el.intake;
        }
      });
    }

    if (weeklyActivity) {
      weeklyActivity.forEach((el) => {
        const activityDate = new Date(el.createdAt).toLocaleDateString("en-CA");

        if (activityDate === dateKey) {
          burned += el.burn;
        }
      });
    }

    graphData.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      consumed,
      burned,
    });
  }

  return (
    <div className="w-full h-full bg-slate-900 rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={graphData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "8px",
              color: "white",
            }}
            formatter={(value, name) => [
              `${value} kcal`,
              name === "consumed" ? "Consumed" : "Burned",
            ]}
          />

          <Line
            type="monotone"
            dataKey="consumed"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="burned"
            stroke="#f97316"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

// <div className="w-full h-full bg-black z-50">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={graphData}>
//           <CartesianGrid strokeDasharray="3 3" />

//           <XAxis dataKey="date" />

//           <YAxis />

//           <Tooltip />

//           <Legend />

//           <Line
//             type="monotone"
//             dataKey="consumed"
//             name="Calories Consumed"
//             stroke="#10b981"
//             strokeWidth={2}
//           />

//           <Line
//             type="monotone"
//             dataKey="burned"
//             name="Calories Burned"
//             stroke="#ef4444"
//             strokeWidth={2}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
