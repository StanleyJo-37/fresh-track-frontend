import { View, Text } from "react-native";
import { useCameraDevice, Camera } from "react-native-vision-camera";

export default function viewfinder() {
    const device = useCameraDevice("back");
    return <View>
        {
            device ?
                <Camera
                    device={device}
                    isActive
                />
                :
                <Text>Viewfinder</Text>
        }
    </View>
}