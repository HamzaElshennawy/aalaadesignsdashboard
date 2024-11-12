"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
//import Image from "next/image";

export default function AnalyticsContent() {
  return (
    <div>
      <h1>Analytics</h1>
      <CldImage
        alt="Cloudinary logo"
        src="arrival3_yvf3gq"
        width="300"
        height="500"
      />
    </div>
  );
}
