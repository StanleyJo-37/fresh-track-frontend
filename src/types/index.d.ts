export interface UserType {
    username: string;
    avatar?: string;
    email?: string;
}

export interface ResultsType {

}

export interface ViewfinderContextProps {
    image: string;
    setImage: (newImage: string) => void;
}