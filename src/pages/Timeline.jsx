import { useContext, useState } from "react";
import { TimelineContext } from "../context/TimelineContext";

export default function Timeline() {
  const { timeline } = useContext(TimelineContext);
  const [filter, setFilter] = useState("all");

  // ✅ Date formatter (Month name, day, year)
  const formatDate = (dateStr) => {
    if (!dateStr) return "No date";

    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr; // if already formatted

    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ✅ Safe filter (case-insensitive)
  const filtered =
    filter === "all"
      ? timeline
      : timeline.filter(
          (t) => t.type?.toLowerCase() === filter.toLowerCase()
        );

  // ✅ Icons
  const getIcon = (type) => {
    if (!type) return "🤝";
    const t = type.toLowerCase();

    if (t === "call") return "📞";
    if (t === "text") return "💬";
    if (t === "video") return "🎥";
    return "🤝"; // meetup/default
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-10 pb-2">
      <div className="max-w-6xl mx-auto px-6">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-6">Timeline</h1>

        {/* FILTER */}
        <select
          className="bg-white border rounded px-3 py-2 mb-6"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Filter timeline</option>
          <option value="Call">Call</option>
          <option value="Text">Text</option>
          <option value="Video">Video</option>
        </select>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <p className="text-gray-500">No timeline entries found.</p>
        )}

        {/* ITEMS */}
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4"
            >
              {/* ICON */}
              <div className="text-2xl">
                {getIcon(item.type)}
              </div>

              {/* TEXT */}
              <div>
              <p className="font-medium">
  {item.title ? (
    <>
      <span className="text-[#244D3F] font-semibold">
        {item.title.split(" ")[0]}
      </span>{" "}
      {item.title.split(" ").slice(1).join(" ")}
    </>
  ) : (
    <>
      <span className="text-[#244D3F] font-semibold">
        {item.type || "Activity"}
      </span>{" "}
      {item.name ? `with ${item.name}` : ""}
    </>
  )}
</p>

                <p className="text-sm text-gray-500">
                  {formatDate(item.date)}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}