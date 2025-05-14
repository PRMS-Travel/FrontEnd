import { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Place } from './util'; // Place 인터페이스 import

export interface KakaoMapHandle {
    relayout: () => void;
    panTo: (lat: number, lng: number) => void; // 특정 좌표로 지도 이동 함수 추가
}

interface KakaoMapProps {
    centerLat?: number;  // 지도의 중심 위도
    centerLng?: number; // 지도의 중심 경도
    places?: Place[];    // 마커를 표시할 장소 배열
}

const KakaoMap = forwardRef<KakaoMapHandle, KakaoMapProps>(({
    centerLat = 33.507233,  // 기본 중심 위도 (제주)
    centerLng = 126.493416, // 기본 중심 경도 (제주)
    places = [],
}, ref) => {

    const [map, setMap] = useState<kakao.maps.Map | null>(null);

    useImperativeHandle(ref, () => ({
        relayout: () => {
            if (map) {
                map.relayout();
                map.setCenter(new kakao.maps.LatLng(centerLat, centerLng)); // 현재 중심 좌표로 다시 설정
                console.log("Kakao Map relayout triggered");
            }
        },
        panTo: (lat: number, lng: number) => {
            if (map) {
                map.panTo(new kakao.maps.LatLng(lat, lng));
            }
        },
    }));

    // centerLat, centerLng 또는 map 객체가 변경될 때 지도의 중심을 업데이트합니다.
    useEffect(() => {
      if (map) {
        map.setCenter(new kakao.maps.LatLng(centerLat, centerLng));
      }
    }, [centerLat, centerLng, map]);

    return (
        <Map
            level={8}
            center={{ lat: centerLat, lng: centerLng }} // 초기 중심 좌표 설정
            style={{ width: '100%', height: '100vh' }}
            onCreate={setMap}
        >
            {places.map((place) => {
                const lat = parseFloat(place.mapy);
                const lng = parseFloat(place.mapx);
                // 유효한 좌표인 경우에만 마커를 렌더링합니다.
                if (!isNaN(lat) && !isNaN(lng)) {
                    return (
                        <MapMarker
                            key={place.id}
                            position={{ lat: lat, lng: lng }}
                            title={place.name} // 마커에 마우스 오버 시 장소 이름 표시 (선택 사항)
                        />
                    );
                }
                return null; // 유효하지 않은 좌표는 마커를 렌더링하지 않음
            })}
        </Map>
    );
});

KakaoMap.displayName = 'KakaoMap';

export default KakaoMap;
