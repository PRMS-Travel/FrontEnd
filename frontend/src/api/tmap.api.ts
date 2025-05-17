export type Position = [number, number];

export interface GeoJSONPoint {
    type: "Point";
    coordinates: Position;
}

export interface GeoJSONMultiPoint {
    type: "MultiPoint";
    coordinates: Position[];
}

export interface GeoJSONLineString {
    type: "LineString";
    coordinates: Position[];
}

export interface GeoJSONMultiLineString {
    type: "MultiLineString";
    coordinates: Position[][];
}

export type GeoJSONGeometry =
    | GeoJSONPoint
    | GeoJSONMultiPoint
    | GeoJSONLineString
    | GeoJSONMultiLineString;

export interface TmapRouteResponseFeatureProperties {
    totalTime?: number;
    totalDistance?: number;
}

export interface TmapRouteResponseFeature {
    type: string;
    geometry: GeoJSONGeometry;
    properties?: TmapRouteResponseFeatureProperties; // TMAP 응답에 따라 properties가 없을 수도 있음을 고려
}

export interface TmapRouteResponse {
    type: string;
    features: TmapRouteResponseFeature[];
}

const TMAP_API_KEY = import.meta.env.VITE_TMAP_API_KEY;
const TMAP_STATIC_MAP_API_URL = "https://apis.openapi.sk.com/tmap/staticMap";

export interface StaticMapOptions {
    width?: number;
    height?: number;
    zoom?: number;
    pathColor?: string; // Hex RRGGBB (e.g., "FF0000" for red)
    pathWeight?: number; // Thickness of the path line
    markers?: string; // Marker string, e.g., "lon1,lat1,label1|lon2,lat2,label2"
}

/**
 * Generates a URL for the TMap Static Map API to display a route.
 * @param segmentCoordinates Array of [lon, lat] positions for the route segment.
 * @param options Optional parameters for the static map.
 * @returns The URL for the TMap Static Map image, or undefined if coordinates are insufficient or API key is missing.
 */
export function generateTmapStaticMapUrl(
    segmentCoordinates: Position[],
    options?: StaticMapOptions
): string | undefined {
    if (!TMAP_API_KEY) {
        console.error("TMAP API 키가 .env 파일에 VITE_TMAP_API_KEY로 설정되지 않았습니다.");
        return undefined;
    }
    if (!segmentCoordinates || segmentCoordinates.length < 2) {
        // console.warn("Static Map URL 생성: 경로를 그리려면 최소 2개의 좌표가 필요합니다.");
        return undefined; // Not enough points to draw a path
    }

    const pathString = segmentCoordinates.map(pos => `${pos[0]},${pos[1]}`).join('_');

    const params = new URLSearchParams({
        version: "1",
        appKey: TMAP_API_KEY,
        width: (options?.width ?? 300).toString(), // Default width
        height: (options?.height ?? 150).toString(), // Default height
        paths: pathString,
    });

    if (options?.zoom) params.append("zoom", options.zoom.toString());
    if (options?.pathColor) params.append("pathColor", options.pathColor);
    if (options?.pathWeight) params.append("pathWeight", options.pathWeight.toString());
    if (options?.markers) params.append("markers", options.markers);

    return `${TMAP_STATIC_MAP_API_URL}?${params.toString()}`;
}

export async function getRouteTime(
    startX: string,
    startY: string,
    endX: string,
    endY: string
): Promise<{ durationInMinutes: number | null; routeCoordinates?: Position[]; error?: string }> {
    if (!TMAP_API_KEY) {
        const errorMessage = "TMAP API 키가 .env 파일에 VITE_TMAP_API_KEY로 설정되지 않았습니다.";
        console.error(errorMessage);
        return { durationInMinutes: null, routeCoordinates: undefined, error: "API 키 없음" };
    }
    const TMAP_DIRECTIONS_API_URL = "https://apis.openapi.sk.com/tmap/routes"; // Renamed for clarity

    const params = new URLSearchParams({
        version: "1",
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        reqCoordType: "WGS84GEO",
        resCoordType: "WGS84GEO",
        // trafficInfo: "Y", // This is for the Directions API, not Static Map
        appKey: TMAP_API_KEY,
    });

    try {
        const response = await fetch(`${TMAP_DIRECTIONS_API_URL}?${params.toString()}`);

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = { message: response.statusText };
            }
            console.error(
                `TMap API 오류 (${startX},${startY} -> ${endX},${endY}): ${response.status}`,
                errorData
            );
            return { durationInMinutes: null, routeCoordinates: undefined, error: `API 오류 ${response.status}` };
        }

        const data: TmapRouteResponse = await response.json();

        if (data.features && data.features.length > 0) {
            const feature = data.features[0];
            let durationInMinutes: number | null = null;
            let routeCoordinates: Position[] | undefined = undefined;

            if (feature.properties && feature.properties.totalTime !== undefined) {
                durationInMinutes = Math.round(feature.properties.totalTime / 60);
            }

            // 경로 좌표 추출 (LineString 타입인 경우)
            if (feature.geometry && feature.geometry.type === "LineString") {
                routeCoordinates = feature.geometry.coordinates;
            }

            // 소요 시간 또는 경로 정보 중 하나라도 있으면 반환
            if (durationInMinutes !== null || routeCoordinates) {
                return { durationInMinutes, routeCoordinates, error: undefined };
            }
        }
        console.warn(`TMap API 응답에서 totalTime 또는 경로 정보를 찾을 수 없습니다 (${startX},${startY} -> ${endX},${endY}). 응답 데이터:`, data);
        return { durationInMinutes: null, routeCoordinates: undefined, error: "소요 시간 또는 경로 정보 없음" };

    } catch (error: unknown) {
        let errorMessage = "네트워크 오류";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error(`TMap API 호출 중 오류 (${startX},${startY} -> ${endX},${endY}):`, error);
        return { durationInMinutes: null, routeCoordinates: undefined, error: `네트워크 또는 API 호출 오류: ${errorMessage}` };
    }
}
