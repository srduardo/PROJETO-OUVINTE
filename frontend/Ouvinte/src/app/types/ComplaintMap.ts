import { LocationObject } from "expo-location";
import { ImageDetails } from "./ImageDetails";

export type ComplaintMap = {
    id: string,
    title: string,
    description: string,
    type: string,
    image: ImageDetails,
    votes: number,
    latitude: number,
    longitude: number,
    location: LocationObject
    isVoted: boolean | null
};