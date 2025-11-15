import contentful from "@/libs/contentful";
import Image from "next/image";
import React from "react";
import { cache } from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import dayjs from "dayjs";
import "./resource.css";
import VimeoComponent from "@/components/vimeo/vimeo.component";
import FormComponent from "@/components/form/form.component";
import YoutubeComponent from "@/components/youtube/youtube.component";
import mixpanel from "mixpanel";
import Link from "next/link"; // Import the Link component

export const getData = cache(async (params) => {
  const res = await contentful.getEntries({
    "fields.slug": params.slug,
    content_type: "resource",
  });
  if (res.items.length === 0) {
    return {
      notFound: true,
    };
  }
  const featuredImage = res.items[0].fields.featuredImage;
  const image = await contentful.getAsset(featuredImage.sys.id);
  return {
    resource: res.items[0],
    featuredImage: image.fields.file.url,
  };
});

export default async function resourceType({ params }) {
  const data = await getData(params);
  if (data.notFound) {
    return <>404</>;
  }
  const { resource, featuredImage } = data;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* The back button is added here */}
      <Link href="/" className="inline-flex items-center mb-6 text-gray-600 hover:text-lva-600 transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="text-sm font-medium">Back to Resources</span>
      </Link>

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-5xl font-semibold mb-2 leading-tight">
          {resource.fields.title}
        </h1>
        <p className="text-gray-500 text-sm">
          {dayjs(resource.sys.createdAt).format("MMMM DD, YYYY")}
        </p>
      </div>

      {/* Media */}
      <div className="relative mb-8 rounded-lg overflow-hidden shadow-md">
        {resource.fields.video || resource.fields.videoYoutube ? (
          <div className="aspect-video">
            {resource.fields.videoYoutube && (
              <YoutubeComponent id={resource.fields.videoYoutube} />
            )}
            {resource.fields.video && (
              <VimeoComponent id={resource.fields.video} />
            )}
          </div>
        ) : (
          <div className="aspect-video">
            {featuredImage && (
              <Image
                src={`https:${featuredImage}`}
                fill={true}
                alt={resource.fields.title}
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Content and Form */}
      <div
        className={`content ${resource.fields.form ? "grid grid-cols-1 md:grid-cols-2 gap-8" : ""
          }`}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: documentToHtmlString(resource.fields.content),
          }}
        ></div>

        <FormComponent form={resource.fields.form} />
      </div>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const Mixpanel = require("mixpanel");
  const mixpanel = Mixpanel.init("a42e77f3f44abf2463f784cab5cf1065");
  const data = await getData(params);
  const { resource, featuredImage } = data;

  mixpanel.track("Page view", { page: resource.fields.title });

  return {
    title: `${resource?.fields?.title} | LinkedVA`,
    openGraph: {
      images: [`https:${featuredImage}`],
    },
  };
}