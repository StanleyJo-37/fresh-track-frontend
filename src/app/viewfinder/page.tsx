"use client";

import AiAPI from "@/api/AiAPI";
import axios from "@/api/axios";
import { Icons } from "@/components/icons";
import { base64ToFile } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useWindowSize } from "@uidotdev/usehooks";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function Page() {
  const cameraRef = useRef<Webcam>(null);
  const router = useRouter();
  const { width: screenWidth, height: screenHeight } = useWindowSize();

  const snap = useCallback(async () => {
    const image = cameraRef.current?.getScreenshot(); // get base64

    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("snapped_image", image ?? "")
    }

    router.push('/viewfinder/item')

  }, [cameraRef]);

  const videoConstraints = {
    width: Number(screenWidth),
    height: Number(screenHeight),
    facingMode: "user",
  };

  return (
    <>
      <div className="w-screen h-screen relative justify-center items-center">
        <Webcam
          audio={false}
          //   height={735}
          //   width={488}

          ref={cameraRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="absolute text-white left-0 bottom-0 z-50">
        <p>Height: {screenHeight}</p>
        <p>Width: {screenWidth}</p>
      </div>

      <div className="w-full h-fit relative flex justify-center">
        <div
          className="rounded-full bg-white w-16 h-16 my-4 fixed bottom-0 flex justify-center items-center active:shadow-inner border-2 border-green-500/50 shadow-lg"
          onClick={snap}
        >
          <Icons.Camera className="w-1/2 h-1/2" />
        </div>
      </div>
    </>
  );
}
