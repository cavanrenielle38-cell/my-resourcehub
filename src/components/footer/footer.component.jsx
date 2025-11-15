"use client";

// import Image from "next/image"; // <--- ERROR NANGGAGALING DITO, KAYA TINANGGAL KO
import React, { useEffect } from "react";
// Removed useState, axios, and useForm as they are no longer needed

export default function FooterComponent() {
  // This useEffect hook will load the GHL form embed script when the component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      const existingScript = document.querySelector(
        'script[src="https://link.msgsndr.com/js/form_embed.js"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []); // The empty array ensures this runs only once

  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-8 lg:py-12">
        <div className="md:flex md:justify-between">
          <div className="mb-12 md:mb-0">
            <a href="/" className="flex items-center">
              {/* Updated Logo to use standard <img> tag */}
              <img
                src="https://storage.googleapis.com/msgsndr/agEzTZFOjO9SzqbJdY4l/media/68289ca1787c0482867d101a.png"
                alt="Made by Ren Logo"
                className="w-48"
              />
            </a>
            <p className="mt-4 text-gray-400 text-sm">
              From a Filipino solopreneur to a global strategist.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Subscribe to my newsletter
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Get my best insights on funnels, AI, and client acquisition, sent
              straight to your inbox. No fluff, just strategy.
            </p>

            {/* Replaced the custom form with your GHL Form Embed */}
            <div style={{ height: "432px", width: "100%" }}>
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/28J8YQZCSgKWsq481cc4"
                style={{ width: "100%", height: "100%", border: "none", borderRadius: "3px" }}
                id="inline-28J8YQZCSgKWsq481cc4"
                data-layout='{"id":"INLINE"}'
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="[NL] Newsletter Form"
                data-height="432"
                data-layout-iframe-id="inline-28J8YQZCSgKWsq481cc4"
                data-form-id="28J8YQZCSgKWsq481cc4"
                title="[NL] Newsletter Form"
              ></iframe>
            </div>
            {/* The script is now loaded via the useEffect hook */}

          </div>
        </div>
        {/* UPDATED: Reduced margins on the <hr> tag to lessen the gap */}
        <hr className="my-4 border-gray-700 sm:mx-auto lg:my-6" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2025{" "}
            <a href="https://madebyren.me/" className="hover:underline">
              Made by Ren
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 gap-4">
            <a
              href="https://www.linkedin.com/in/reniellecavan/"
              className="text-gray-500 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
              <span className="sr-only">LinkedIn page</span>
            </a>
            {/* START: Added Facebook Icon */}
            <a
              href="https://www.facebook.com/madebyrenren"
              className="text-gray-500 hover:text-white"
              target="_blank" // Added target="_blank" to open in a new tab
              rel="noopener noreferrer" // Added for security
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0 0 3.603 0 8.05C0 12.06 2.868 15.286 6.546 15.975V10.278h-2.01V8.049h2.01V6.33c0-2.005 1.192-3.095 3.007-3.095.862 0 1.75.152 1.75.152v1.94h-1.01c-.973 0-1.268.583-1.268 1.23v1.503h2.23l-.36 2.228h-1.87V15.975A8.007 8.007 0 0 0 16 8.049z" />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            {/* END: Added Facebook Icon */}
          </div>
        </div>
      </div>
    </footer>
  );
}