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

  // Check if all values are 0
  const hasData = data.some((item) => item.value > 0);

  const COLORS = ["#7c3aed", "#1f4d3b", "#2f9e44"];

  return (
    <div className="bg-gray-100 pt-10 pb-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-6">
          Friendship Analytics
        </h1>

        {/* CARD */}
        <div className="bg-white rounded-xl shadow-sm p-6">

          <p className="text-[20px] font-medium text-gray-600 mb-4">
            By Interaction Type
          </p>

          {/* CONDITIONAL RENDER */}
          {!hasData ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <img
  src="/pie-chart.png"
  alt="No data"
  className="w-16 h-16 mb-3 object-contain"
/>
              <p className="text-gray-500 text-lg font-medium mb-2">
                No interactions logged yet
              </p>
              <p className="text-gray-400 text-sm">
                Start calling, texting, or video chatting with your friends to see insights here.
              </p>
            </div>
          ) : (
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
          )}

        </div>
      </div>
    </div>
  );
}