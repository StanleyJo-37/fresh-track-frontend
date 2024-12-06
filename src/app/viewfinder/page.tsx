"use client";

import { Icons } from '@/components/icons';
import { MutableRefObject, useEffect, useRef } from 'react';
import { CameraProps, VisionCamera } from 'react-vision-camera';
import { create, useStore } from "zustand";

interface CameraState {
    isActive: boolean;
    isPause: boolean;
    cameraPosition: CameraProps["desiredCamera"];
}

interface CameraAction {
    toggleActive: () => void;
    togglePause: () => void;
    setCameraPosition: (newCameraPosition: CameraProps["desiredCamera"]) => void;
}

const CameraStateStore = create<CameraState & CameraAction>((set) => ({
    isActive: true,
    isPause: false,
    cameraPosition: "back",
    cameraRef: null,
    toggleActive: () => set(state => ({ isActive: !state.isActive })),
    togglePause: () => set(state => ({ isPause: !state.isPause })),
    setCameraPosition: (newCameraPosition: CameraProps["desiredCamera"]) => set(() => ({ cameraPosition: newCameraPosition })),
}));

export default function Page() {
    const { isActive, isPause, cameraPosition, toggleActive, togglePause, setCameraPosition } = useStore(CameraStateStore);
    const cameraRef = useRef<HTMLVideoElement | null>(null);

    const snap = (download: boolean) => {
        const width = cameraRef.current?.videoWidth;
        const height = cameraRef.current?.videoHeight;
        
        const canvas = document.createElement("canvas");
        canvas.width = width ?? 0;
        canvas.height = height ?? 0;

        var context = canvas.getContext("2d");
        context?.fillRect(0, 0, width ?? 0, height ?? 0);
        context?.drawImage(cameraRef.current, 0, 0, width ?? 0, height ?? 0);
        
        var dataURI = canvas.toDataURL('image/png');
        if (download) {
            dataURI = dataURI.replace('image/png', 'image/octet-stream');
        }
        window.open(dataURI)?.focus();
    }

    useEffect(() => {

    }, [cameraRef.current?.readyState])

    const onOpened = (cam: HTMLVideoElement, camLabel: string) => { // You can access the video element in the onOpened event
        cameraRef.current = cam;
        cameraRef.current.disablePictureInPicture = true;

        console.log("Camera loaded.");
    }
    
    const onClosed = () => {
        console.log("closed");
    }
    
    const onDeviceListLoaded = (devices:MediaDeviceInfo[]) => {
        console.log(devices);
    }

    return (
        <>
            <div className="flex-grow h-screen relative justify-center items-center">
                <VisionCamera
                    isActive={isActive}
                    isPause={isPause}
                    desiredCamera={cameraPosition}
                    desiredResolution={{ width:1280, height:720 }}
                    onOpened={onOpened}
                    onClosed={() => {

                    }}
                    onDeviceListLoaded={() => {

                    }}
                />
            </div>
            <div
                className="rounded-full bg-white w-16 h-16 fixed right-8 top-1/2 flex justify-center items-center"
                onClick={() => {
                    snap(true);
                }}
            >
                <Icons.Camera className='w-1/2 h-1/2'/>
            </div>
        </>
    );
}