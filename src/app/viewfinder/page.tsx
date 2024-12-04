"use client";

import { CameraProps, VisionCamera } from 'react-vision-camera';
import { create, useStore } from "zustand";

interface CameraState {
    isActive: boolean;
    isPaused: boolean;
    cameraPosition: CameraProps["desiredCamera"];
}

interface CameraAction {
    toggleActive: () => void;
    togglePause: () => void;
    setCameraPosition: (newCameraPosition: CameraProps["desiredCamera"]) => void;
}

const CameraStateStore = create<CameraState & CameraAction>((set) => ({
    isActive: true,
    isPaused: false,
    cameraPosition: "back",
    toggleActive: () => set(state => ({ isActive: !state.isActive })),
    togglePause: () => set(state => ({ isPaused: !state.isPaused })),
    setCameraPosition: (newCameraPosition: CameraProps["desiredCamera"]) => set(() => ({ cameraPosition: newCameraPosition })),
}));

export default function Page() {
    const { isActive, isPaused, cameraPosition, toggleActive, togglePause, setCameraPosition} = useStore(CameraStateStore);

    return (
        <div className="flex-grow h-screen justify-center items-center">
            {/* <AspectRatio ratio={9 / 16}> */}
                {/* <div className="w-[300px] h"> */}
                    <VisionCamera
                        isActive={isActive}
                        isPause={isPaused}
                        desiredCamera={cameraPosition}
                        desiredResolution={{width:1280,height:720}}
                        onOpened={() => {

                        }}
                        onClosed={() => {

                        }}
                        onDeviceListLoaded={() => {

                        }}
                    />
                {/* </div> */}
            {/* </AspectRatio> */}
        </div>
    );
}