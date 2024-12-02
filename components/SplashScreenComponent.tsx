import { screenSize } from "@/constants/Size";
import { Image, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { SplashLogo } from "./images";

export default function SplashScreenComponent() {
    return (
        <View>
            <LinearGradient
                colors={['transparent', '#06d001']}
                style={{
                    width: screenSize.width,
                    height: screenSize.height,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    zIndex: -999,
                }}
            >
                <SplashLogo/>
                <Text
                    style={{
                        fontFamily: "Nunito-ExtraBold",
                        fontSize: 60,
                        marginTop: 36,
                        color: 'white',
                        width: '50%',
                        textAlign: 'center',
                    }}
                >
                    Fresh Track
                </Text>
            </LinearGradient>
        </View>
    );
}