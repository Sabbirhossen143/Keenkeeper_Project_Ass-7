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

          <span
  className={`inline-block text-xs px-3 py-1 rounded-full mt-1 font-medium ${
    friend.status === "Overdue"
      ? "bg-red-600 text-white"
      : friend.status === "Almost Due"
      ? "bg-yellow-600 text-white"
      : friend.status === "On-Track"
      ? "bg-[#263B26] text-white"
      : "bg-gray-100 text-gray-600"
  }`}
>
  {friend.status}
</span>

          <div className="flex justify-center gap-2 flex-wrap mt-2">
  {friend.tags?.map((tag, i) => (
    <span
      key={i}
      className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
    >
      {tag}
    </span>
  ))}
</div>

          <p className="italic text-gray-500 text-sm mt-3">
            "{friend.bio}"
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Preferred: email
          </p>
        </div>

        {/* ACTION BUTTON CARDS */}
        <div className="bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 flex items-center justify-center gap-3">
        <img src="/snooze.png" className="w-6 h-6" />
        <span>Snooze 2 Weeks</span>
        </div>

        <div className="bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 flex items-center justify-center gap-3">
        <img src="/file.png" className="w-6 h-6" />
        <span>Archive</span>
        </div>

       <div className="bg-white p-3 rounded-lg shadow-sm text-red-500 cursor-pointer hover:bg-red-50 flex items-center justify-center gap-3">
       <img src="/delete.png" className="w-5 h-5" />
       <span>Delete</span>
       </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="md:col-span-2 space-y-4">

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <p className="text-[35px] font-bold text-[#244D3F]">
              {friend.days_since_contact}
            </p>
            <p className="text-gray-500">Days Since Contact</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <p className="text-[35px] font-bold text-[#244D3F]">{friend.goal}</p>
            <p className="text text-gray-500">Goal (Days)</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm text-center ">
            <p className="text-[30px] font-bold text-[#244D3F]">
  {new Date(friend.next_due_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}
</p>
            <p className="text text-gray-500">Next Due</p>
          </div>
        </div>

        {/* RELATIONSHIP GOAL */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
          <div className="flex flex-col gap-4">
            <h3 className="text-[25px] text-[#244D3F] font-semibold">Relationship Goal</h3>
            <p className="text-[20px] text-gray-500">
              Connect every <span className="font-bold text-black">{friend.goal} days</span>
            </p>
          </div>
          <button className="border px-3 py-1 rounded hover:bg-gray-100">
            Edit
          </button>
        </div>

        {/* QUICK CHECK-IN */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-[25px] font-bold text-[#244D3F] mb-3">Quick Check-In</h3>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleClick("Call")}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-3"
            >
              <img src="/call.png" className="w-5 h-5" />
              <span>Call</span>
            </button>

            <button
              onClick={() => handleClick("Text")}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2"
            >
              <img src="/text.png" className="w-5 h-5" />
              <span>Text</span>
            </button>

            <button
              onClick={() => handleClick("Video")}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2"
            >
              <img src="/video.png" className="w-5 h-5" />
              <span>Video</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
  );
}