import { useEffect, useState } from "react";
import { PermissionsAndroid, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from "react-native-vision-camera";
// import { labelImage } from "vision-camera-image-labeler";

const frameProcessor = useFrameProcessor((frame) => {
    'worklet'

    // const label = labelImage(frame);
    console.log(`You're looking at a ${label}.`);
}, []);

export default function Viewfinder() {
    const device = useCameraDevice('back');
    const { hasPermission } = useCameraPermission();
    const [isPermitted, setIsPermitted] = useState<boolean>(hasPermission);
    const [isReady, setIsReady] = useState<boolean>(false);

    const requestCameraPermission = async() => {
        if (!hasPermission) {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Fresh Track Camera Permission',
                        message: 'Fresh Track membutuhkan akses kamera.',
                        buttonNegative: 'Batal',
                        buttonPositive: 'Ok',
                    },
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setIsReady(true);
                }
            } catch (err) {
                Toast.show({
                    type: 'error',
                    text1: 'Gagal untuk mengakses kamera.',
                    text2: 'Silakan coba lagi.',
                });
            }
        }
    }

    useEffect(() => {
        requestCameraPermission();
    }, []);

    if (!isPermitted || !isReady) {
        return (
            <View>
                <Text>Fresh Track tidak memiliki akses ke kamera.</Text>
            </View>
        );
    }
    else if (!device) {
        return (
            <View>
                <Text>Kamera tidak ditemukan.</Text>
            </View>
        );
    }

    return (
        <Camera
            device={device}
            frameProcessor={}
            isActive
        />
    )
}