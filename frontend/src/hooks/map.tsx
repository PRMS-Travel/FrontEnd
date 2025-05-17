import { useState, useImperativeHandle, forwardRef, useEffect, useRef, useCallback } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Place } from './util'; // Place 인터페이스 import
import { RouteSegmentWithColor } from '../pages/schdule/schedule';
import { getMarkerImageUrlForDay } from '../utils/colors';

export interface KakaoMapHandle {
    relayout: () => void;
    panTo: (lat: number, lng: number) => void; // 특정 좌표로 지도 이동 함수 추가
    fitBoundsToData: () => void; // 데이터에 맞춰 지도 범위를 재설정하는 함수
}

interface KakaoMapProps {
    centerLat?: number;  // 지도의 중심 위도
    centerLng?: number; // 지도의 중심 경도
    places?: Place[];    // 마커를 표시할 장소 배열
    routeSegments?: RouteSegmentWithColor[];
}

const KakaoMap = forwardRef<KakaoMapHandle, KakaoMapProps>(({
    centerLat = 33.507233,  // 기본 중심 위도 (제주)
    centerLng = 126.493416, // 기본 중심 경도 (제주)
    places = [],
    routeSegments = [],
}, ref) => {

    const [map, setMap] = useState<kakao.maps.Map | null>(null);
    const polylinesRef = useRef<kakao.maps.Polyline[]>([]);
    // 현재 데이터셋에 대해 초기 bounds가 설정되었는지 추적
    const hasSetBoundsForCurrentData = useRef(false);

    // Bounds를 계산하고 설정하는 헬퍼 함수
    const calculateAndSetBounds = useCallback((forceFit = false) => {
        if (!map) return;

        // 데이터가 없으면 bounds를 조절할 필요 없음
        if ((!routeSegments || routeSegments.length === 0) && (!places || places.length === 0)) {
            hasSetBoundsForCurrentData.current = false; // 데이터가 없으므로 다음 데이터 로드 시 bounds 재설정 가능
            return;
        }

        // 강제 맞춤이 아니고, 현재 데이터에 대해 이미 bounds가 설정되었다면 실행 안 함
        if (!forceFit && hasSetBoundsForCurrentData.current) {
            return;
        }

        const bounds = new kakao.maps.LatLngBounds();
        (routeSegments || []).forEach(segmentWithColor => {
            if (segmentWithColor.coordinates) {
                segmentWithColor.coordinates.forEach(coord => bounds.extend(new kakao.maps.LatLng(coord.y, coord.x)));
            }
        });
        (places || []).forEach(place => {
            const lat = parseFloat(place.mapy);
            const lng = parseFloat(place.mapx);
            if (!isNaN(lat) && !isNaN(lng)) {
                bounds.extend(new kakao.maps.LatLng(lat, lng));
            }
        });

        if (!bounds.isEmpty()) {
            if (import.meta.env.NODE_ENV === 'development') {
                console.log(`[KakaoMap] ${forceFit ? "Forcing fit to" : "Setting initial"} bounds.`);
            }
            map.setBounds(bounds, 100, 100, 100, 100); // 상하좌우 여백 100px
            if (!forceFit) { // 강제 맞춤이 아닐 때만 플래그 설정
                hasSetBoundsForCurrentData.current = true;
            }
        }
        }, [map, routeSegments, places] );

    useImperativeHandle(ref, () => ({
        relayout: () => {
            if (map) {
                map.relayout();
                if (places.length > 0 && !isNaN(parseFloat(places[0].mapy)) && !isNaN(parseFloat(places[0].mapx))) {
                    map.setCenter(new kakao.maps.LatLng(parseFloat(places[0].mapy), parseFloat(places[0].mapx)));
                } else {
                    map.setCenter(new kakao.maps.LatLng(centerLat, centerLng));
                }
                if (import.meta.env.NODE_ENV === 'development') {
                    console.log("Kakao Map relayout triggered");
                }
            }
        },
        panTo: (lat: number, lng: number) => {
            if (map) {
                map.panTo(new kakao.maps.LatLng(lat, lng));
            }
        },
        fitBoundsToData: () => {
            calculateAndSetBounds(true); // 강제로 bounds 재설정
        }
    }));

    // centerLat, centerLng props 변경 시 지도 중심 이동
    useEffect(() => {
        if (map && (centerLat !== map.getCenter().getLat() || centerLng !== map.getCenter().getLng())) {
            map.setCenter(new kakao.maps.LatLng(centerLat, centerLng));
        }
    }, [centerLat, centerLng, map]);

    // 경로 그리기 로직
    useEffect(() => {
        if (!map || !window.kakao || !window.kakao.maps) return;

        if (import.meta.env.NODE_ENV === 'development') {
            console.log("[KakaoMap] 경로 그리기 useEffect 실행, routeSegments:", routeSegments);
        }

        polylinesRef.current.forEach(polyline => polyline.setMap(null));
        polylinesRef.current = [];

        if (routeSegments && routeSegments.length > 0) {
            routeSegments.forEach((segmentWithColor, segmentIndex) => {
                if (!segmentWithColor || !segmentWithColor.coordinates || segmentWithColor.coordinates.length < 2) return;

                const path = segmentWithColor.coordinates.map(coord => new kakao.maps.LatLng(coord.y, coord.x));
                if (import.meta.env.NODE_ENV === 'development') {
                    console.log(`[KakaoMap] Polyline 생성용 path (세그먼트 ${segmentIndex}):`, path);
                }
                const polyline = new kakao.maps.Polyline({
                    path: path,
                    strokeWeight: 5,
                    strokeColor: segmentWithColor.color,
                    strokeOpacity: 0.7,
                    strokeStyle: 'solid'
                });
                polyline.setMap(map);
                polylinesRef.current.push(polyline);
            });
        }
        return () => {
            polylinesRef.current.forEach(polyline => polyline.setMap(null));
        };
    }, [map, routeSegments]);

    // routeSegments 또는 places 데이터가 변경되었을 때 초기 bounds를 설정합니다.
    useEffect(() => {
        // routeSegments나 places prop이 변경되면, 새로운 데이터셋으로 간주하고
        // 다음번 calculateAndSetBounds 호출 시 bounds를 설정할 수 있도록 플래그를 리셋합니다.
        hasSetBoundsForCurrentData.current = false;
        calculateAndSetBounds(false); // 새 데이터에 대해 초기 bounds 설정 시도
    }, [map, routeSegments, places, calculateAndSetBounds]); // map 의존성도 중요 (map 객체가 준비된 후 실행)

    return (
        <Map
            level={8} // 초기 레벨, setBounds에 의해 조절될 수 있음
            center={{ lat: centerLat, lng: centerLng }} // 초기 중심 좌표 설정
            style={{ width: '100%', height: '100vh' }}
            onCreate={setMap}
        >
            {(places || []).map((place) => {
                const lat = parseFloat(place.mapy);
                const lng = parseFloat(place.mapx);
                if (!isNaN(lat) && !isNaN(lng)) {
                    const markerImageUrl = place.dayNumber
                        ? getMarkerImageUrlForDay(place.dayNumber)
                        : getMarkerImageUrlForDay(0); // dayNumber가 없으면 기본 마커 URL (getMarkerImageUrlForDay(0)이 기본 URL을 반환하도록 설정됨)

                    const imageWidth = 32; // 마커 이미지 너비
                    const imageHeight = 32; // 마커 이미지 높이
                    const imageOffsetX = 16; // 마커 이미지 x 오프셋 (이미지 너비의 절반)
                    const imageOffsetY = 32; // 마커 이미지 y 오프셋 (이미지 높이) - 하단 중앙을 기준으로 할 경우

                    const markerImageProp = {
                        src: markerImageUrl,
                        size: { width: imageWidth, height: imageHeight },
                        options: { offset: { x: imageOffsetX, y: imageOffsetY } }
                    };

                    console.log(place.dayNumber, markerImageUrl);

                    return (
                        <MapMarker
                            key={`marker-${place.id}`}
                            position={{ lat: lat, lng: lng }}
                            title={place.name}
                            image={markerImageProp} // 수정된 image prop 전달
                        />
                    );
                }
                return null;
            })}
        </Map>
    );
});

KakaoMap.displayName = 'KakaoMap';

export default KakaoMap;
