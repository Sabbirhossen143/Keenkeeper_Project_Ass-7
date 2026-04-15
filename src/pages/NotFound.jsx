import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">

        <h1 className="text-8xl font-extrabold text-green-900 mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Looks like this friendship link is broken. The page <br />
          you're looking for doesn't exist or has been moved.
        </p>

        {/* ✅ Button with icon */}
        <Link to="/">
          <button className="flex items-center gap-2 bg-green-900 text-white px-6 py-2 rounded-md hover:bg-green-800 transition mx-auto">
            <FaHome />
            Back to Home
          </button>
        </Link>

      </div>
    </div>
  );
}