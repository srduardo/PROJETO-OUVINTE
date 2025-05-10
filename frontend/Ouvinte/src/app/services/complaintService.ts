import { useCallback } from "react";
import { LocationObject, LocationObjectCoords } from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ComplaintResponse } from "../types/ComplaintResponse";
import { ComplaintRequest } from "../types/ComplaintRequest";
import { ComplaintMap } from "../types/ComplaintMap";

export const getComplaintLocation = (complaint: ComplaintResponse): LocationObject => {
    const coords: LocationObjectCoords = {
        longitude: complaint.longitude,
        latitude: complaint.latitude,
        altitude: 0,
        accuracy: 0,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0
    }

    const complaintLocation: LocationObject = {
        coords: coords,
        timestamp: 0
    }
    
    return complaintLocation;
}

export const applyComplaintLocation = async (complaint: ComplaintMap): Promise<ComplaintMap> => {
    const stringUserLocation: string = await AsyncStorage.getItem('userLocation');
    const jsonUserLocation = JSON.parse(stringUserLocation);
    complaint.location = jsonUserLocation;    
    return complaint; 
}

export const filterComplaints = (jsonStoredComplaints: ComplaintMap[], jsonComplaints: ComplaintMap[]): ComplaintMap[][] => {
    const storedComplaintIds = new Set(jsonStoredComplaints.map((c) => c.id));
    const newComplaint = jsonComplaints.filter((c) => !storedComplaintIds.has(c.id));

    const complaintIds = new Set(jsonComplaints.map((c) => c.id));
    const deletedComplaint = jsonStoredComplaints.filter((c) => !complaintIds.has(c.id));

    return [newComplaint, deletedComplaint];
}

export const storeComplaintsLocally = async (complaints: ComplaintMap[]) => {
    const stringComplaints: string = JSON.stringify(complaints);
    await AsyncStorage.setItem('complaints', stringComplaints);
}

export const updateComplaints = (newComplaints: ComplaintMap[], jsonStoredComplaints: ComplaintMap[]) => {
    if (newComplaints.length > 0) {
        newComplaints = [...jsonStoredComplaints, ...newComplaints];
        storeComplaintsLocally(newComplaints);
        console.log("Novas denúncias registradas!");
        return;
    }
}

export const removeDeletedComplaints = (deletedComplaints: ComplaintMap[], jsonStoredComplaints: ComplaintMap[]): ComplaintMap[] => {
    if (deletedComplaints) {           
        const deletedComplaintsId = new Set(deletedComplaints.map((c) => c.id));
        const nonDeletedComplaints = jsonStoredComplaints.filter((c) => !deletedComplaintsId.has(c.id));
        storeComplaintsLocally(nonDeletedComplaints);
        return nonDeletedComplaints;
    }
}

