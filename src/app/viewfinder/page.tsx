"use client";

import AiAPI from "@/api/AiAPI";
import axios from "@/api/axios";
import { Icons } from "@/components/icons";
import { base64ToFile } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import Webcam from "react-webcam";

export default function Page() {
  const cameraRef = useRef<Webcam>(null);
  const router = useRouter();


  const snap = useCallback(() => {
    const image = cameraRef.current?.getScreenshot();

    const file = base64ToFile(image!, 'temp.jpeg');

    const formData = new FormData();
    formData.append('image_upload', file);
    axios.post('/ai', formData);

  }, [cameraRef]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <>
      <div className="flex-grow h-screen relative justify-center items-center">
        <Webcam
          audio={false}
          height={720}
          width={1280}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          ref={cameraRef}
        />
      </div>
      <div
        className="rounded-full bg-white w-16 h-16 fixed right-8 top-1/2 flex justify-center items-center"
        onClick={snap}
      >
        <Icons.Camera className="w-1/2 h-1/2" />
      </div>
    </>
  );
}
