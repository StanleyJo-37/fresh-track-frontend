import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";

const SplashLogo = (props: SvgProps) => (
    <Svg
        width={130}
        height={130}
        fill="none"
        {...props}
    >
        <Rect width={130} height={130} fill="#fff" rx={20} />
        <Path
            fill="#06D001"
            d="M49.56 68.81c-4.253.587-7.773.88-10.56.88-.953 0-1.43-.367-1.43-1.1 0-1.687 1.137-3.447 3.41-5.28 2.347-1.907 6.123-3.557 11.33-4.95 2.347-8.36 5.023-16.023 8.03-22.99-7.333.367-13.347 2.787-18.04 7.26a79.391 79.391 0 0 1-2.86 2.75c-.733.66-1.393.99-1.98.99-.513 0-1.027-.44-1.54-1.32-.513-.88-.77-2.053-.77-3.52.073-5.647 3.887-10.23 11.44-13.75 7.553-3.52 16.867-5.243 27.94-5.17l33 .55c1.98 0 2.97.77 2.97 2.31 0 .44-.293 1.247-.88 2.42a23.45 23.45 0 0 0-1.54 3.63c-.953 2.64-3.007 3.96-6.16 3.96H98.4l-14.63-.11H75.3c-.587 4.18-2.347 11-5.28 20.46l20.13.33c1.173 0 1.76.697 1.76 2.09 0 .44-.183 1.21-.55 2.31a46.233 46.233 0 0 0-.99 3.41c-.587 2.42-1.833 3.63-3.74 3.63l-16.72-.77h-1.43c-.44 0-.953.037-1.54.11-3.813 14.007-5.72 25.08-5.72 33.22 0 4.327-4.217 6.49-12.65 6.49-1.833 0-2.933-.917-3.3-2.75-.293-1.907-.44-4.4-.44-7.48 0-6.6 1.577-15.803 4.73-27.61Z"
        />
    </Svg>
)

export {
    SplashLogo
};
