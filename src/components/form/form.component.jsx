"use client";
import React, { useEffect } from "react";

export default function FormComponent({ form }) {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://link.roasmail.com/js/form_embed.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="border rounded-md border-gray-300 shadow-md px-3">
      <div
        dangerouslySetInnerHTML={{
          __html: form,
        }}
      ></div>
    </div>
  );
}
