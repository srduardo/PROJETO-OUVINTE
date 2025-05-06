import { useCallback } from "react";
import { Complaint } from "../types/Complaint";
import { LocationObject, LocationObjectCoords } from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const handleComplaintLocation = (complaints: Complaint[]): Complaint[] => {
    complaints.forEach((c) => {
        const coords: LocationObjectCoords = {
            longitude: c.latitude,
            latitude: c.longitude,
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

        c.location = complaintLocation;
    });

    return complaints;
}

export const filterComplaints = (jsonStoredComplaints: Complaint[], jsonComplaints: Complaint[]): Complaint[][] => {
    const storedComplaintIds = new Set(jsonStoredComplaints.map((c) => c.id));
    const newComplaint = jsonComplaints.filter((c) => !storedComplaintIds.has(c.id));

    const complaintIds = new Set(jsonComplaints.map((c) => c.id));
    const deletedComplaint = jsonStoredComplaints.filter((c) => !complaintIds.has(c.id));

    return [newComplaint, deletedComplaint];
}

export const storeComplaintsLocally = async (complaints: Complaint[]) => {
    const stringComplaints: string = JSON.stringify(complaints);
    await AsyncStorage.setItem('complaints', stringComplaints);
}

export const updateComplaints = (newComplaints: Complaint[], jsonStoredComplaints: Complaint[]) => {
    if (newComplaints.length > 0) {
        newComplaints = [...jsonStoredComplaints, ...newComplaints];
        storeComplaintsLocally(newComplaints);
        console.log("Novas denúncias registradas!");
        return;
    }
}

export const removeDeletedComplaints = (deletedComplaints: Complaint[], jsonStoredComplaints: Complaint[]): Complaint[] => {
    if (deletedComplaints) {           
        const deletedComplaintsId = new Set(deletedComplaints.map((c) => c.id));
        const nonDeletedComplaints = jsonStoredComplaints.filter((c) => !deletedComplaintsId.has(c.id));
        storeComplaintsLocally(nonDeletedComplaints);
        return nonDeletedComplaints;
    }
}

