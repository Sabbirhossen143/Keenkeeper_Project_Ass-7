import { useContext } from "react";
import { TimelineContext } from "../context/TimelineContext";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Stats() {
  const { timeline } = useContext(TimelineContext);

  const counts = {
    Call: 0,
    Text: 0,
    Video: 0,
  };

  timeline.forEach((t) => {
    if (counts[t.type] !== undefined) {
      counts[t.type]++;
    }
  });

  const data = [
    { name: "Text", value: counts.Text },
    { name: "Call", value: counts.Call },
    { name: "Video", value: counts.Video },
  ];

  // 🎨 Colors (match screenshot style)
  const COLORS = ["#7c3aed", "#1f4d3b", "#2f9e44"];

  return (
    <div className="bg-gray-100 pt-10 pb-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* TITLE */}
        <h1 className="text-5xl font-bold mb-6">
          Friendship Analytics
        </h1>

        {/* CARD */}
        <div className="bg-white rounded-xl shadow-sm p-6">

          <p className="text-[20px] font-medium text-gray-600 mb-4">
            By Interaction Type
          </p>

          {/* CHART */}
          <div className="flex justify-center">
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={70}   
                outerRadius={100}
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend iconType="circle" />
            </PieChart>
          </div>

        </div>
      </div>
    </div>
  );
}