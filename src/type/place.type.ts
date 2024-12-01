export interface Place {
    id?: string;
    place_name: string;
    address_name: string;
    road_address: {
        address_name: string;
        zone_no?: string;
    } | null;
    x: string;
    y: string;
}
