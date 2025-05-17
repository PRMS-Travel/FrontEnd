const MARKER_IMAGE_URLS = [
    '/assets/markers/marker_red.png',    // DAY_COLORS[0]에 대응
    '/assets/markers/marker_orange.png',  // DAY_COLORS[1]에 대응
    '/assets/markers/marker_yellow.png',   // DAY_COLORS[2]에 대응
    '/assets/markers/marker_green.png',   // DAY_COLORS[3]에 대응
    '/assets/markers/marker_blue.png', // DAY_COLORS[4]에 대응
    '/assets/markers/marker_violet.png', // DAY_COLORS[5]에 대응
    '/assets/markers/marker_purple.png',// DAY_COLORS[6]에 대응
];

const DEFAULT_MARKER_IMAGE_URL = '/assets/markers/marker_default.png'; // 기본 마커

export const DAY_COLORS = [
    '#FF5555', // 1일차: 선명한 주황-빨강 (시작색)
    '#FF8C00', // 2일차: 다크오렌지
    '#B79A00', // 3일차: 골드 (노랑)
    '#32CD32', // 4일차: 라임그린 (초록)
    '#1E90FF', // 5일차: 도저블루 (파랑)
    '#9370DB', // 6일차: 미디엄퍼플 (남색/보라)
    '#C71585', // 7일차: 미디엄바이올렛레드 (자주/보라)
];

/**
 * 날짜 번호에 따라 색상을 반환합니다.
 * 색상 팔레트를 순환하여 사용합니다.
 * @param dayNumber - 1부터 시작하는 날짜 번호
 * @returns hex 색상 코드
 */
export const getColorForDay = (dayNumber: number): string => {
    if (dayNumber <= 0) return '#000000'; // 기본 검은색 또는 다른 기본값
    return DAY_COLORS[(dayNumber - 1) % DAY_COLORS.length];
};

/**
 * 날짜 번호에 따라 마커 이미지 URL을 반환합니다.
 * @param dayNumber - 1부터 시작하는 날짜 번호
 * @returns 마커 이미지 파일 경로
 */
export const getMarkerImageUrlForDay = (dayNumber: number): string => {
    if (dayNumber <= 0 || dayNumber > MARKER_IMAGE_URLS.length) {
        return DEFAULT_MARKER_IMAGE_URL;
    }
    return MARKER_IMAGE_URLS[(dayNumber - 1) % MARKER_IMAGE_URLS.length];
};
