import { useState, useImperativeHandle, forwardRef } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export interface KakaoMapHandle {
    relayout: () => void;
}

interface KakaoMapProps {
    latitude?: number;  // 위도
    longitude?: number; // 경도
}

const KakaoMap = forwardRef<KakaoMapHandle, KakaoMapProps>(({
    latitude = 33.507233,
    longitude = 126.493416,
}, ref) => {

    const [map, setMap] = useState<kakao.maps.Map | null>(null);

    useImperativeHandle(ref, () => ({
        relayout: () => {
            if (map) {
                map.relayout();
                map.setCenter(new kakao.maps.LatLng(latitude, longitude));
                console.log("Kakao Map relayout triggered");
            }
        },
    }));

    // 컴포넌트가 리렌더링될 때마다 중심 좌표 업데이트
    // useEffect(() => {
    //   if (map) {
    //     map.setCenter(new kakao.maps.LatLng(latitude, longitude));
    //   }
    // }, [latitude, longitude, map]);

    return (
        <Map
            level={8}
            center={{ lat: latitude, lng: longitude }}
            style={{ width: '100%', height: '100vh' }}
            onCreate={setMap}
        >
            <MapMarker position={{ lat: latitude, lng: longitude }}></MapMarker>
        </Map>
    );
});

KakaoMap.displayName = 'KakaoMap';

export default KakaoMap;
