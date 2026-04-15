import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#264d3b] text-white ">
      
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">KeenKeeper</h1>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-6">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        {/* Social Links */}
        <p className="mb-3">Social Links</p>

<div className="flex justify-center gap-4 mb-6">

  <div className="bg-white p-2 rounded-full cursor-pointer hover:scale-110 transition">
    <img src="/instagram.png" alt="Instagram" className="w-5 h-5" />
  </div>

  <div className="bg-white p-2 rounded-full cursor-pointer hover:scale-110 transition">
    <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
  </div>

  <div className="bg-white p-2 rounded-full cursor-pointer hover:scale-110 transition">
    <img src="/twitter.png" alt="Twitter" className="w-5 h-5" />
  </div>


</div>

        {/* Divider */}
        <hr className="border-gray-500 mb-4" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between text-xs text-gray-300">

          <p>© 2026 KeenKeeper. All rights reserved.</p>

          <div className="flex gap-4 justify-center mt-2 md:mt-0">
            <p className="cursor-pointer hover:underline">Privacy Policy</p>
            <p className="cursor-pointer hover:underline">Terms of Service</p>
            <p className="cursor-pointer hover:underline">Cookies</p>
          </div>

        </div>

      </div>
    </footer>
  );
}