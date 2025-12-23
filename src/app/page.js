"use client";
import { useEffect, useState } from "react";
// UPDATED: Paths reverted to aliased versions for your environment
import client from "@/libs/contentful";
import mixpanel from "mixpanel-browser";
import ResourceComponent from "@/components/resource/resource.component";
import FeaturedComponent from "@/components/featured/featured.component";

export default function Home() {
  const [resources, setResources] = useState(null);
  const [tempResources, setTempResources] = useState(null);
  const [resourcesTypes, setResourcesTypes] = useState(null);
  const [filter, setFilter] = useState(null);

  const defineFilter = (newFilter) => {
    if (newFilter === filter) {
      setFilter(null);
    } else {
      setFilter(newFilter);
    }
  };

  useEffect(() => {
    if (filter) {
      // Ensure tempResources is not null before filtering
      if (tempResources) {
        setResources(
          tempResources.filter(
            (resource) => resource.fields.resourceType.sys.id === filter
          )
        );
      }
    } else {
      setResources(tempResources);
    }
  }, [filter, tempResources]); // Added tempResources dependency

  useEffect(() => {
    client
      .getEntries({
        content_type: "resource",
        "fields.featured[ne]": true,
        order: "-sys.createdAt",
      })
      .then((response) => {
        setResources(response.items);
        setTempResources(response.items);
      });

    client
      .getEntries({
        content_type: "resourceType",
      })
      .then((response) => {
        setResourcesTypes(response.items);
      });
  }, []);

  return (
    // UPDATED: Main background to a cooler, modern slate-50
    <main className="min-h-screen bg-slate-50 text-gray-800 pb-20">

      {/* Hero Section - Modern, Clean Card Design */}
      {/* UPDATED: Removed top padding/margin to close gap */}
      <div className="bg-white p-8 sm:p-12 rounded-b-3xl shadow-lg mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col items-center">

        {/* UPDATED: BIGGER Logo */}
        <img
          src="https://storage.googleapis.com/msgsndr/agEzTZFOjO9SzqbJdY4l/media/68fdae2e82e2e2b6801e4676.png"
          alt="The Strategist's Vault Logo"
          className="h-[auto] w-[450px] "
        />

        {/* Hero Text - Clear Hierarchy */}
        {/* UPDATED: Removed "The Strategist's Vault" h1 */}
        <div className="text-center max-w-3xl">
          <h2 className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed">
            A curated collection of no-BS guides, actionable strategies, and real-world resources for Funnel Strategists.
          </h2>
        </div>

        {/* Featured Component - Placed neatly below */}
        <div className="mt-12 w-full">
          <FeaturedComponent />
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!resources ? (
          <div className="flex justify-center items-center py-20 text-gray-500">
            <p>Loading resources...</p>
          </div>
        ) : (
          <>
            {/* Filter Buttons - Polished, cohesive, high-contrast */}
            <div className="flex flex-wrap gap-2 my-12 justify-center">
              <button
                onClick={() => defineFilter(null)}
                className={`py-2.5 px-6 font-semibold text-sm rounded-full transition-all duration-300 ease-in-out ${filter === null
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200" // Polished inactive state
                  }`}
              >
                All
              </button>
              {resourcesTypes?.map((resourceType) => (
                <button
                  key={resourceType.sys.id}
                  onClick={() => defineFilter(resourceType.sys.id)}
                  className={`py-2.5 px-6 font-semibold text-sm rounded-full transition-all duration-300 ease-in-out ${filter === resourceType.sys.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200" // Polished inactive state
                    }`}
                >
                  {resourceType.fields.name}
                </button>
              ))}
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {resources.map((resource) => (
                <ResourceComponent
                  resource={resource}
                  key={resource.sys.id}
                  resourceType={resourcesTypes?.find(
                    (resourceType) =>
                      resource.fields.resourceType && // Added safety check
                      resource.fields.resourceType.sys.id ===
                      resource.fields.resourceType.sys.id
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
