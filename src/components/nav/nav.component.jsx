"use client";

// import mixpanel from "mixpanel-browser"; // <--- This will cause an error in this environment, so it's commented out.
// import Image from "next/image"; // <--- This is for Next.js, using standard <img> instead.
// import Link from "next/link"; // <--- Removed as it's not used.
import React from "react";

// mixpanel.init("a42e77f3f44abf2463f784cab5cf1065", {
//   debug: true,
//   track_pageview: true,
//   persistence: "localStorage",
// });

export default function NavComponent() {
  // const ITEMS = []; // Items are commented out as per the provided code

  const trackBookCall = () => {
    // mixpanel.track("Book a Call"); // <--- This would cause an error.
    console.log("Track: Book a Call"); // Added a placeholder
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-20 top-0 start-0 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://madebyren.me/" // UPDATED: Link
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          {/* Replaced Next/Image with standard <img> */}
          <img
            src="https://storage.googleapis.com/msgsndr/agEzTZFOjO9SzqbJdY4l/media/68fda6bba4758af673389edf.png" // UPDATED: Logo URL
            alt="Made by Ren Logo" // UPDATED: Alt text
            style={{ height: "20px", width: "auto" }} // Added style for sizing

          />
        </a>
        <div className="flex gap-8">
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <a
              href="https://api.leadconnectorhq.com/widget/bookings/strategy-call-ren" // UPDATED: Link
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackBookCall()}
              // UPDATED: Class for orange button
              className="text-gray-900 bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-amber-300 font-bold rounded-lg text-sm px-5 py-3 text-center transition-colors"
            >
              Book a Call
            </a>
            {/* Removed hamburger menu button since nav links are removed */}
          </div>
          {/* The entire div for nav links has been removed to fix the error and meet the requirement */}
        </div>
      </div>
    </nav>
  );
}

