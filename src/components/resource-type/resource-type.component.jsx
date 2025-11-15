import React from "react";
import Link from "next/link";

export default function ResourceTypeComponent({ resourceType }) {
  return (
    <Link>
      <div
        key={resourceType.sys.id}
        className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
      >
        {resourceType.fields.name}
      </div>
    </Link>
  );
}
