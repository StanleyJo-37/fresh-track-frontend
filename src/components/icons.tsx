import { icons as lucide_icons, type LucideProps } from "lucide-react";
import Image from "next/image";

const custom_icons = {
  logo: ({ width = 16, height = 16, ...props }:LucideProps) => (
    <Image
      src="/fresh-track-logo-empty.png"
      alt="FreshTrack"
      width={width as number}
      height={height as number}
      className={props.className}
    />
  ),
};


export const Icons = {
  ...custom_icons,
  ...lucide_icons
};
