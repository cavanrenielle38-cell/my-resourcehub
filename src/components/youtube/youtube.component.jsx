"use client";
import React from "react";
import YouTube from "react-youtube";
import styles from "./styles.module.css";

export default function YoutubeComponent({ id }) {
  return (
    <div className={styles.youtube}>
      <YouTube
        videoId={id}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
