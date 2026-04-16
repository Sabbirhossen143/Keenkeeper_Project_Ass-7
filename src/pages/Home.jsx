import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { TimelineContext } from "../context/TimelineContext";

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { timeline } = useContext(TimelineContext);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
        setLoading(false);
      });
  }, []);


  // Stats calculation
  const total = friends.length;
  const onTrack = friends.filter(f => f.status === "On-Track").length;
  const overdue = friends.filter(f => f.status === "Overdue").length;

  const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const interactionsThisMonth = timeline.filter((t) => {
  const d = new Date(t.date);
  return (
    d.getMonth() === currentMonth &&
    d.getFullYear() === currentYear
  );
}).length;

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Banner Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-[#1F2937] mb-2">
            Friends to keep close in your life
          </h1>
          <p className="text-base font-normal text-[#64748B] mb-4-gray-500 text-[#64748B] mb-4">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the <br /> relationships that matter most.
          </p>

          <button className="bg-[#244D3F] text-white px-4 py-2 rounded hover:bg-green-700">
            + Add a Friend
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-[32px] font-semibold text-[#244D3F]">{total}</h2>
            <p className="text-gray-500 text-[17px]">Total Friends</p>
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-[32px] font-semibold text-[#244D3F]">{onTrack}</h2>
            <p className="text-gray-500 text-[17px]">On Track</p>
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-[32px] font-semibold text-[#244D3F]">{overdue}</h2>
            <p className="text-gray-500 text-[17px]">Need Attention</p>
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-[32px] font-semibold text-[#244D3F]">{interactionsThisMonth}</h2>
            <p className="text-gray-500 text-[17px]">Interactions This Month</p>
          </div>
        </div>

        {/* Friends Section */}
        <h2 className="font-bold text-3xl mb-6">Your Friends</h2>
        
        {loading ? (
  <div className="flex justify-center items-center py-12">
    <div className="w-10 h-10 border-4 border-[#244D3F] border-t-transparent rounded-full animate-spin"></div>
  </div>
) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {friends.map((friend) => (
            <Link key={friend.id} to={`/friend/${friend.id}`}>
              <div className="bg-white p-5 rounded shadow text-center hover:shadow-lg transition">

                {/* Image */}
                <img
                  src={friend.picture}
                  className="w-16 h-16 mx-auto rounded-full mb-3"
                />

                {/* Name */}
                <h3 className="font-semibold">{friend.name}</h3>

                {/* Days */}
                <p className="text-sm text-gray-400 mb-2">
                  {friend.days_since_contact} days ago
                </p>

                {/* Tags */}
                <div className="flex justify-center gap-2 flex-wrap mb-2">
                  {friend.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Status */}
                <span
  className={`text-xs px-3 py-1 rounded-full font-medium ${
    friend.status === "Overdue"
      ? "bg-red-600 text-white border border-red-300"
      : friend.status === "Almost Due"
      ? "bg-yellow-600 text-white border border-yellow-500"
      : friend.status === "On-Track"
      ? "bg-[#263B26] text-white border border-[#1b2a1b]"
      : "bg-gray-100 text-gray-600"
  }`}
>
  {friend.status}
</span>
              </div>
            </Link>
          ))}
        </div>
        )}

      </div>
    </div>
  );
}