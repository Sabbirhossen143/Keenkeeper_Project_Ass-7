import { useContext, useState } from "react";
import { TimelineContext } from "../context/TimelineContext";

export default function Timeline() {
  const { timeline } = useContext(TimelineContext);

  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  // ✅ Format Date ONLY
  const formatDate = (dateStr) => {
    if (!dateStr) return "No date";

    const d = new Date(dateStr);
    if (isNaN(d)) return "Invalid date";

    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ✅ Filter
  const filtered =
    filter === "all"
      ? timeline
      : timeline.filter(
          (t) => t.type?.toLowerCase() === filter.toLowerCase()
        );

  // ✅ FIXED SORT (safe + correct)
  const sorted = [...filtered].sort((a, b) => {
    if (!a.date || !b.date) return 0;

    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    if (sortOrder === "newest") {
      return dateB - dateA; // newest first
    } else {
      return dateA - dateB; // oldest first
    }
  });

  // ✅ Icons
  const getIcon = (type) => {
    if (!type) return "🤝";
    const t = type.toLowerCase();
    if (t === "call") return "📞";
    if (t === "text") return "💬";
    if (t === "video") return "🎥";
    return "🤝";
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-10 pb-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-6">Timeline</h1>

        {/* FILTER + SORT */}
        <div className="flex justify-between items-center mb-6">

          {/* FILTER */}
          <div className="relative">
            <button
              onClick={() => {
                setShowFilter(!showFilter);
                setShowSort(false);
              }}
              className="bg-white border border-gray-300 rounded-md px-4 py-2"
            >
              <span className="font-semibold">Filter Timeline :</span>{" "}
              {filter === "all" ? "All" : filter}
            </button>

            {showFilter && (
              <div className="absolute mt-2 w-40 bg-white border rounded-md shadow">
                {["all", "Call", "Text", "Video"].map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      setFilter(item);
                      setShowFilter(false);
                    }}
                    className={`px-4 py-2 cursor-pointer 
                      ${
                        filter === item
                          ? "bg-[#264d3b] text-white"
                          : "hover:bg-[#264d3b] hover:text-white"
                      }`}
                  >
                    {item === "all" ? "All" : item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SORT */}
          <div className="relative">
            <button
              onClick={() => {
                setShowSort(!showSort);
                setShowFilter(false);
              }}
              className="bg-white border border-gray-300 rounded-md px-4 py-2"
            >
              <span className="font-semibold">Sort Timeline :</span>{" "}
              {sortOrder === "newest" ? "Newest" : "Oldest"}
            </button>

            {showSort && (
              <div className="absolute mt-2 w-40 bg-white border rounded-md shadow">

                <div
                  onClick={() => {
                    setSortOrder("newest");
                    setShowSort(false);
                  }}
                  className={`px-4 py-2 cursor-pointer 
                    ${
                      sortOrder === "newest"
                        ? "bg-[#264d3b] text-white"
                        : "hover:bg-[#264d3b] hover:text-white"
                    }`}
                >
                  Newest first
                </div>

                <div
                  onClick={() => {
                    setSortOrder("oldest");
                    setShowSort(false);
                  }}
                  className={`px-4 py-2 cursor-pointer 
                    ${
                      sortOrder === "oldest"
                        ? "bg-[#264d3b] text-white"
                        : "hover:bg-[#264d3b] hover:text-white"
                    }`}
                >
                  Oldest first
                </div>

              </div>
            )}
          </div>

        </div>

        {/* EMPTY STATE */}
        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img
              src="/timeline.png"
              alt="No timeline"
              className="w-16 h-16 mb-3 object-contain"
            />
            <p className="text-gray-500 text-lg font-medium mb-2">
              No timeline entries yet
            </p>
            <p className="text-gray-400 text-sm">
              Start by calling, texting, or video chatting with your friends.
            </p>
          </div>
        )}

        {/* ITEMS */}
        <div className="space-y-4">
          {sorted.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4"
            >
              <div className="text-2xl">{getIcon(item.type)}</div>

              <div>
                <p className="font-medium">
                  <span className="text-[#264d3b] font-semibold">
                    {item.type || "Activity"}
                  </span>{" "}
                  {item.name ? `with ${item.name}` : ""}
                </p>

                {/* ✅ ONLY DATE (no live time) */}
                <div className="text-sm text-gray-500">
                  <p>{formatDate(item.date)}</p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}