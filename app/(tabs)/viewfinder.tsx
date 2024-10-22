import { router } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { View, Text, PermissionsAndroid, PermissionStatus, Image, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { useCameraDevice, Camera, CameraDevice, useFrameProcessor } from "react-native-vision-camera";
import { create } from "zustand";
import * as tf from "@tensorflow/tfjs-react-native";
import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native'
import * as FileSystem from 'expo-file-system';
import Canvas from "react-native-canvas";

type State = {
    cameraPosition: "back" | "front";
    cameraPermission: PermissionStatus;
    cameraDevice: CameraDevice | undefined;
};

type Action = {
    changeCameraPosition: () => void;
    setCameraPermission: (newCameraPermission: PermissionStatus) => void;
    setCameraDevice: (newCameraDevice: CameraDevice | undefined) => void;
    checkCameraPermission: () => void;
};

async function RealTimeCamera(device: any, isActive: boolean) {
    const frameProcessor = useFrameProcessor((frame) => {
        'worklet'
        // const objects = detectObjects(frame)
        // const label = objects[0].name
        // console.log(`You're looking at a ${label}.`)
    }, []);

    return <Camera device={device} isActive={isActive} frameProcessor={frameProcessor} />
}

async function getCameraPermission() {
    try {
        const permission = await PermissionsAndroid.check('android.permission.CAMERA');
        return permission ? PermissionsAndroid.RESULTS.GRANTED : PermissionsAndroid.RESULTS.DENIED;
    } catch (err) {
        console.log(err);
        return PermissionsAndroid.RESULTS.DENIED;
    }
}

const useCameraStateStore = create<State & Action>((set) => ({
    cameraPosition: "back",
    cameraPermission: PermissionsAndroid.RESULTS.DENIED,
    cameraDevice: undefined,
    changeCameraPosition: () => {
        set((state) => ({cameraPosition: state.cameraPosition === "back" ? "front" : "back"}));
    },
    setCameraPermission: (newCameraPermission) => set({ cameraPermission: newCameraPermission }),
    setCameraDevice: (newCameraDevice) => set({ cameraDevice: newCameraDevice }),
    checkCameraPermission: async() => {
        const permissionStatus = await getCameraPermission();
        set({ cameraPermission: permissionStatus });
    }
}));

export default function viewfinder() {
    const {
        cameraPosition,
        cameraPermission,
        cameraDevice,
        changeCameraPosition,
        setCameraPermission,
        // checkCameraPermission,
        setCameraDevice,
    } = useCameraStateStore();

    const askCameraPermission = async() => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Fresh Track',
                    message: 'To detect vegetables and fruits, we need to access your camera.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'Grant Permission',
                },
            );

            return granted;
        } catch(err) {
            console.error(err);
            return PermissionsAndroid.RESULTS.DENIED;
        }
    }

    const device = useCameraDevice(cameraPosition);

    useEffect(() => {
        const checkCameraPermission = async() => {
            try {
                const permission = await PermissionsAndroid.check('android.permission.CAMERA');
                return permission ? PermissionsAndroid.RESULTS.GRANTED : PermissionsAndroid.RESULTS.DENIED;
            } catch (err) {
                console.log(err);
                return PermissionsAndroid.RESULTS.DENIED;
            }
        }

        checkCameraPermission()
        .then((permission) => {
            if (permission === PermissionsAndroid.RESULTS.DENIED) {
                askCameraPermission().then((permissionResult) => {
                    switch (permissionResult) {
                        case PermissionsAndroid.RESULTS.GRANTED:
                            setCameraPermission(permissionResult);
                            console.log("Camera opened.");
                            break;
                        case PermissionsAndroid.RESULTS.DENIED:
                            Toast.show({
                                type: "error",
                                text1: "Camera access permission rejected.",
                                text2: "Going back to home page...",
                            })
                            // router.back();
                            break;
                        }
                    });
                }
            // changeCameraPosition();
            setCameraDevice(device);
        })
    }, []);
    
    // const [cameraPosition, setCameraPosition] = useState<"back" | "front">("back");
    return <View>
        {
            cameraDevice ?
                <Camera
                    device={cameraDevice}
                    isActive
                    className="w-screen h-screen"
                />
                :
                <Text>Viewfinder</Text>
        }
        <TouchableOpacity onPress={() => {
            changeCameraPosition()
        }}>
            {/* <Image
                className="absolute left-1/4 bottom-1/4 z-[999]"
                src={require('./../../assets/images/tabler-rotate.svg')}
            /> */}
        </TouchableOpacity>
    </View>
}