import { LocationObject } from "expo-location";

export type ComplaintMap = {
    id: string,
    title: string,
    description: string,
    type: string,
    votes: number,
    latitude: number,
    longitude: number,
    location: LocationObject
};