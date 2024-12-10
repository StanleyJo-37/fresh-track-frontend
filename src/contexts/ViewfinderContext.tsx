import { ViewfinderContextProps } from "@/types";
import { createContext } from "react"

const ViewfinderContext = createContext<ViewfinderContextProps>({
    image: "",
    setImage: () => {}
});

export default ViewfinderContext;