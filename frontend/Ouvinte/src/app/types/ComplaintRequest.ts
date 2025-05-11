export type ComplaintRequest = {
    title: string,
    description: string,
    type: string,
    latitude: number,
    longitude: number,
    votes: number
};