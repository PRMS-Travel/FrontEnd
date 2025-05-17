/**
 * 카카오내비 길안내 API 관련 함수
 */

// 카카오내비 API 응답에서 사용할 좌표 타입
export interface KakaoNaviCoord {
    x: number; // 경도 (longitude)
    y: number; // 위도 (latitude)
}

// 카카오내비 API 응답 구조 (필요한 부분만 정의)
interface KakaoNaviRouteSummary {
    distance: number; // 총 거리 (미터)
    duration: number; // 총 소요 시간 (초)
}

interface KakaoNaviSection {
    guides: KakaoNaviCoord[]; // 경로를 구성하는 가이드 좌표 목록
    roads: { vertexes: number[] }[]; // 경로를 구성하는 도로 좌표 목록 (x,y,x,y...)
    // 필요한 경우 다른 속성 추가
}

interface KakaoNaviRoute {
    result_code: number;
    summary: KakaoNaviRouteSummary;
    sections: KakaoNaviSection[];
}

interface KakaoNaviDirectionsResponse {
    trans_id: string;
    routes: KakaoNaviRoute[];
}

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_NAVI_DIRECTIONS_API_URL = "https://apis-navi.kakaomobility.com/v1/directions";

/**
 * 카카오내비 API를 사용하여 두 지점 간의 예상 이동 시간 및 경로 좌표를 가져옵니다.
 * @param startX 출발지 경도 (longitude)
 * @param startY 출발지 위도 (latitude)
 * @param endX 도착지 경도 (longitude)
 * @param endY 도착지 위도 (latitude)
 * @returns Promise<{ durationInMinutes: number | null; routeCoordinates?: KakaoNaviCoord[]; error?: string }>
 */
export async function getKakaoDirections(
    startX: string,
    startY: string,
    endX: string,
    endY: string
): Promise<{ durationInMinutes: number | null; routeCoordinates?: KakaoNaviCoord[]; error?: string }> {
    if (!KAKAO_REST_API_KEY) {
        const errorMessage = "카카오 REST API 키가 .env 파일에 VITE_KAKAO_REST_API_KEY로 설정되지 않았습니다.";
        console.error(errorMessage);
        return { durationInMinutes: null, routeCoordinates: undefined, error: "API 키 없음" };
    }

    const params = new URLSearchParams({
        origin: `${startX},${startY}`,
        destination: `${endX},${endY}`,
        // waypoints: "", // 경유지 필요시 추가
        priority: "RECOMMEND", // 추천 경로
        // car_type: 1, // 1종 (승용차)
        // summary: true, // 요약 정보만 받을 경우 (경로 좌표는 sections에서)
    });

    try {
        const response = await fetch(`${KAKAO_NAVI_DIRECTIONS_API_URL}?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `KakaoAK ${KAKAO_REST_API_KEY}`,
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`카카오내비 API 오류 (${startX},${startY} -> ${endX},${endY}): ${response.status}`, errorData);
            return { durationInMinutes: null, routeCoordinates: undefined, error: `API 오류 ${response.status} - ${errorData.msg || 'Unknown error'}` };
        }

        const data: KakaoNaviDirectionsResponse = await response.json();
        console.log(`[KakaoNaviAPI] 전체 응답 데이터 (${startX},${startY} -> ${endX},${endY}):`, JSON.stringify(data, null, 2)); // 전체 응답 확인

        if (data.routes && data.routes.length > 0 && data.routes[0].result_code === 0) {
            const route = data.routes[0];
            const durationInMinutes = Math.round(route.summary.duration / 60);
            
            const routeCoordinates: KakaoNaviCoord[] = [];
            route.sections.forEach(section => {
                // 우선적으로 roads의 vertexes를 사용하여 상세 경로를 구성합니다.
                if (section.roads && section.roads.length > 0) {
                    section.roads.forEach(road => {
                        for (let i = 0; i < road.vertexes.length; i += 2) {
                            routeCoordinates.push({ x: road.vertexes[i], y: road.vertexes[i + 1] });
                        }
                    });
                } // guides는 턴바이턴 안내용이므로, 상세 경로 좌표로는 vertexes를 사용합니다.
            });
            return { durationInMinutes, routeCoordinates: routeCoordinates.length > 0 ? routeCoordinates : undefined, error: undefined };
        }
        console.warn(`카카오내비 API 응답에서 유효한 경로를 찾지 못했습니다. (${startX},${startY} -> ${endX},${endY}). 응답:`, data);
        return { durationInMinutes: null, routeCoordinates: undefined, error: data.routes?.[0]?.result_code?.toString() ?? "경로 없음" };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "알 수 없는 네트워크 오류";
        console.error(`카카오내비 API 호출 중 오류 (${startX},${startY} -> ${endX},${endY}):`, error);
        return { durationInMinutes: null, routeCoordinates: undefined, error: `네트워크 오류: ${errorMessage}` };
    }
}