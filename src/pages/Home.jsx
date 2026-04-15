import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  // Stats calculation
  const total = friends.length;
  const onTrack = friends.filter(f => f.status === "on-track").length;
  const overdue = friends.filter(f => f.status === "overdue").length;

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* 🔥 Banner Section */}
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

        {/* 🔥 Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-xl font-bold">{total}</h2>
            <p className="text-gray-500 text-sm">Total Friends</p>
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-xl font-bold">{onTrack}</h2>
            <p className="text-gray-500 text-sm">On Track</p>
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-xl font-bold">{overdue}</h2>
            <p className="text-gray-500 text-sm">Need Attention</p>
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            <h2 className="text-xl font-bold">12</h2>
            <p className="text-gray-500 text-sm">Interactions This Month</p>
          </div>
        </div>

        {/* 🔥 Friends Section */}
        <h2 className="font-semibold text-2xl mb-4">Your Friends</h2>

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

      </div>
    </div>
  );
}