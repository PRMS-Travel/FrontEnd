import { useEffect, useState } from "react";

export interface AreaState {
	name: string;
	code: number;
}

export const useFetchArea = () => {
	const [areas, setAreas] = useState<AreaState[]>([]);

	useEffect(() => {
		const fetchAreaList = async () => {
			const SERVICE_KEY = '1TQg5uN3%2Bn9N5ud14TunWUaCmwmA7Ijg1xe2ZPS9K6xrih%2Bdrd0NEb4OSQWkX7XRJO8bbE%2BirN0RrQoUDW5pmQ%3D%3D';
			const url = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${SERVICE_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json`;
			const response = await fetch(url);
			const data = await response.json();
			setAreas(data.response.body.items.item);
		};

		fetchAreaList();
	}, []);

	return areas;
};