"use client";
import React from "react";
import Vimeo from "@u-wave/react-vimeo";

export default function VimeoComponent({ id }) {
  return <Vimeo video={id} autoplay responsive width={"100%"} />;
}
