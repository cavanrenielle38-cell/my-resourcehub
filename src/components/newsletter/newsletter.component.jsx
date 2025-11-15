"use client";

import axios from "axios";
import mixpanel from "mixpanel-browser";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Newsletter() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState(null);
  const onSubmit = async (data) => {
    try {
      mixpanel.track("Signing Up Now");
      await axios.post(
        "https://services.leadconnectorhq.com/hooks/fysOWWrxHY8I42kA24go/webhook-trigger/5100062e-a2ed-447e-a606-ab5c061b8364",
        data
      );
      setConfirmation(true);
      setError(null);
    } catch (error) {
      setError("An error occurred, please try again.");
    }
  };

  return (
    <div className="bg-lva-600">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <h2 className="text-2xl font-medium text-gray-100 mb-5">
          Just Outsource It!
        </h2>
        {confirmation ? (
          <>
            <p className="text-gray-300 mb-3">
              Thank you for subscribing to our newsletter.
            </p>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="px-3 rounded-lg border border-gray-200 text-sm"
                {...register("fname", { required: true })}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="px-3 rounded-lg border border-gray-200  text-sm"
                {...register("lname", { required: true })}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full sm:w-3/4 px-3 rounded-lg border border-gray-200 text-sm"
                {...register("email", { required: true })}
              />
              <button className="w-full sm:w-1/4 bg-lvaYellow-400 hover:bg-lvaYellow-600 text-white p-3 rounded-lg">
                Sign up now
              </button>
            </div>
          </form>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
