import { httpClient } from "./http";

export interface PlaceInfo {
    contentId: number;
    contentTypeId: number;
    placeId: number;
    add1: string;
    add2?: string;
    firstImage2?: string;
}

export interface AddPlaceRequest {
    contentId?: number;
    contentTypeId?: number;
    add1: string;
    add2?: string;
    firstImage1?: string;
    firstImage2?: string;
    overview?: string;
    tel?: string;
    hmpg?: string;
    mapId: number;
    latitude: number;
    longitude: number;
    stateCode?: number;
}

export interface GetPlacesRequest {
    mapId: number;
}

export interface SuccessResponse {
    message: string;
}

const getPlaces = async (data: GetPlacesRequest): Promise<PlaceInfo[]> => {

    const response = await httpClient.get<PlaceInfo[]>('/places/', { data });
    return response.data;
};

const addPlace = async (placeData: AddPlaceRequest): Promise<SuccessResponse> => {
    const response = await httpClient.post<SuccessResponse>('/places/', placeData);
    return response.data;
};

const updatePlaceStatus = async (placeId: number): Promise<void> => {
    await httpClient.put(`/places/${placeId}`);
};

const deletePlace = async (placeId: number): Promise<SuccessResponse> => {
    const response = await httpClient.delete<SuccessResponse>(`/places/${placeId}`);
    return response.data;
};

export const placeAPI = {
    serviceKey: import.meta.env.VITE_TOUR_API_KEY,
    getPlaces,
    addPlace,
    updatePlaceStatus,
    deletePlace,
};

export type PlaceAPIType = typeof placeAPI;