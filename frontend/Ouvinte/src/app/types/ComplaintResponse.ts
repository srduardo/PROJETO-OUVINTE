import { ImageDetails } from "./ImageDetails";

export type ComplaintResponse = {
    id: string,
    title: string,
    description: string,
    type: string,
    image: ImageDetails,
    latitude: number,
    longitude: number,
    duration: string,
    votes: number
};