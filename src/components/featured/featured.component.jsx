"use client";
import React, { useEffect, useState } from "react";
// Imports are kept as-is for your live environment
import contentful from "@/libs/contentful";
import Image from "next/image";
import Link from "next/link";
import mixpanel from "mixpanel-browser";

export default function FeaturedComponent() {
  const [resource, setResource] = useState(null);

  const getData = async () => {
    try {
      const res = await contentful.getEntries({
        content_type: "resource",
        "fields.featured": true,
      });
      // UPDATED: Handle no items gracefully
      if (res.items.length === 0) {
        console.log("No featured items found.");
        return;
      }
      const featuredImage = res.items[0].fields.featuredImage;
      const image = await contentful.getAsset(featuredImage.sys.id);
      setResource({
        resource: res.items[0],
        featuredImage: image.fields.file.url,
      });
    } catch (error) {
      console.error("Error fetching Contentful data:", error);
    }
  };

  const openFeatured = () => {
    mixpanel.track("Featured Resource");
  };

  useEffect(() => {
    getData();
  }, []);

  // UPDATED: Added skeleton loader for better UX
  if (resource === null) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-pulse">
        <div className="relative w-full h-80 md:h-96 bg-gray-200 rounded-xl"></div>
        <div className="flex flex-col justify-center text-center md:text-left">
          <div className="h-6 w-1/2 bg-gray-200 rounded-full mb-4 mx-auto md:mx-0"></div>
          <div className="h-10 w-full bg-gray-200 rounded-lg mb-5"></div>
          <div className="h-16 w-3/4 bg-gray-200 rounded-lg mb-6 mx-auto md:mx-0"></div>
          <div className="h-12 w-1/3 bg-gray-200 rounded-lg mt-4 mx-auto md:mx-0"></div>
        </div>
      </div>
    );
  }

  return (
    // UPDATED: Cleaned up container, added gap and vertical alignment
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

      {/* --- Image Section --- */}
      {/* UPDATED: Removed rotation and hover effect, border color adjusted for light bg */}
      <div className="relative w-full h-80 md:h-96">
        <Image
          src={`https:${resource?.featuredImage}`}
          fill={true}
          alt={resource?.resource.fields.title || "Featured Resource"}
          className="object-cover rounded-xl shadow-lg border-4 border-gray-100" // No rotation, border color for light bg
        />
      </div>

      {/* --- Text Section --- */}
      {/* UPDATED: Text styling for light background */}
      <div className="flex flex-col justify-center text-center md:text-left">
        <div className="flex justify-center md:justify-start">
          {/* UPDATED: Badge style for light bg */}
          <div className="bg-indigo-100 text-indigo-500 rounded-full flex px-4 py-1 mb-4 text-sm font-medium">
            Featured Resource
          </div>
        </div>

        {/* UPDATED: Title text color for light bg */}
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          {resource?.resource.fields.title}
        </h2>

        {/* UPDATED: Excerpt text color for light bg */}
        <p className="text-gray-600 text-xl mb-6">
          {resource?.resource.fields.excerpt}
        </p>

        <div className="flex justify-center md:justify-start">
          {/* UPDATED: Button style for light bg, no hover scale */}
          <Link
            href={resource?.resource.fields.slug}
            className="text-white bg-lvaYellow-400 px-6 py-3 mt-4 rounded-lg font-semibold text-base shadow-md hover:bg-lvaYellow-500 transition-colors duration-200" // No hover scale
            onClick={() => openFeatured()}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}