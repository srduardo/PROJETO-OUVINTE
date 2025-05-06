import { LocationObject } from "expo-location";

export type Complaint = {
    id: string,
    title: string,
    description: string,
    type: string,
    latitude: number,
    longitude: number,
    duration: string,
    votes: number
    location: LocationObject,
};