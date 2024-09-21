import { Text } from "react-native";
import { useCameraDevice, Camera } from "react-native-vision-camera";

export default function Viewfinder() {
    const cameraDevice = useCameraDevice('back');
    
    return cameraDevice ? (
        <Camera
            device={cameraDevice}
            isActive={true}
        />
    ) : (
        <Text>No Camera Found.</Text>
    );
}