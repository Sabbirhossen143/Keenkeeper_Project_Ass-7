import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { TimelineContext } from "../context/TimelineContext";
import toast from "react-hot-toast";

export default function FriendDetails() {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);
  const { addEntry } = useContext(TimelineContext);

  useEffect(() => {
    fetch("/friends.json")
      .then(res => res.json())
      .then(data => {
        const f = data.find(x => x.id == id);
        setFriend(f);
      });
  }, [id]);

  if (!friend) return <p className="p-6">Loading...</p>;

  const handleClick = (type) => {
    addEntry(type, friend.name);
    toast(`${type} logged!`);
  };

  return (
    <div className="bg-gray-100 pt-10 pb-12">
  <div className="max-w-6xl mx-auto p-6">

    <div className="grid md:grid-cols-3 gap-6">

      {/* LEFT SIDE */}
      <div className="space-y-4">

        {/* PROFILE CARD */}
        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <img
            src={friend.picture}
            className="w-20 h-20 mx-auto rounded-full mb-3"
          />
          <h2 className="font-semibold">{friend.name}</h2>

          <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded mt-1">
            Overdue
          </span>

          <p className="text-sm text-gray-500 mt-1">FAMILY</p>

          <p className="italic text-gray-500 text-sm mt-3">
            "{friend.bio}"
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Preferred: email
          </p>
        </div>

        {/* ACTION BUTTON CARDS */}
        <div className="bg-white p-3 rounded-lg shadow-sm text-center cursor-pointer hover:bg-gray-50">
          ⏰ Snooze 2 Weeks
        </div>

        <div className="bg-white p-3 rounded-lg shadow-sm text-center cursor-pointer hover:bg-gray-50">
          📦 Archive
        </div>

        <div className="bg-white p-3 rounded-lg shadow-sm text-center text-red-500 cursor-pointer hover:bg-red-50">
          🗑 Delete
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="md:col-span-2 space-y-4">

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <p className="text-xl font-semibold">
              {friend.days_since_contact}
            </p>
            <p className="text-sm text-gray-500">Days Since Contact</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <p className="text-xl font-semibold">{friend.goal}</p>
            <p className="text-sm text-gray-500">Goal (Days)</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <p className="text-sm font-semibold">
              {friend.next_due_date}
            </p>
            <p className="text-sm text-gray-500">Next Due</p>
          </div>
        </div>

        {/* RELATIONSHIP GOAL */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Relationship Goal</h3>
            <p className="text-sm text-gray-500">
              Connect every {friend.goal} days
            </p>
          </div>
          <button className="border px-3 py-1 rounded hover:bg-gray-100">
            Edit
          </button>
        </div>

        {/* QUICK CHECK-IN */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-3">Quick Check-In</h3>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleClick("Call")}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              📞 Call
            </button>

            <button
              onClick={() => handleClick("Text")}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              💬 Text
            </button>

            <button
              onClick={() => handleClick("Video")}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              🎥 Video
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
  );
}