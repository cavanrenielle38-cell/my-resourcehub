import React, { useEffect } from "react";
import contentful from "@/libs/contentful";
import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";

export default function ResourceComponent({ resource, clientResourceType }) {
  const { title, excerpt, featuredImage, slug } = resource.fields;
  const [image, setImage] = React.useState(null);

  useEffect(() => {
    contentful.getAsset(featuredImage.sys.id).then((asset) => {
      setImage(asset.fields.file.url);
    });
  }, []);

  return (
    <div className="border-solid border border-gray-200 shadow-md rounded-md ">
      <Link href={`/${slug}`}>
        <div className="w-full mb-3 relative h-64 bg-zinc-100">
          {image && (
            <Image
              src={`https:${image}`}
              fill={true}
              alt={title}
              style={{
                objectFit: "cover",
              }}
            />
          )}
        </div>
      </Link>

      <div className="p-3 pb-7">
        <span className="px-3 py-1 rounded-3xl text-xs border border-gray-200">
          {clientResourceType?.fields.name}
        </span>
        <p className="text-gray-500 mb-2 mt-3 text-sm">
          {dayjs(resource.sys.createdAt).format("dddd, MMMM DD YYYY")}
        </p>
        <h2 className="font-semibold text-xl mb-3">{title}</h2>
        <div className="text-sm text-gray-400">{excerpt}</div>
        <Link href={`/${slug}`}>
          <p className="text-sm mt-4 hover:underline">Read More</p>
        </Link>
      </div>
    </div>
  );
}
