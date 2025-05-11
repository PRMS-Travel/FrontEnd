import axios from "axios";

const TOUR_API_BASE_URL = 'http://apis.data.go.kr/B551011/KorService1';
const SERVICE_KEY = import.meta.env.VITE_TOUR_API_KEY;
const MOBILE_OS = 'ETC';
const MOBILE_APP = 'AppTest';

interface TourApiBaseParams {
    serviceKey: string;
    MobileOS: string;
    MobileApp: string;
    _type?: 'json';
    numOfRows?: number;
    pageNo?: number;
}

interface TourApiResponseHeader {
    resultCode: string;
    resultMsg: string;
}

interface TourApiResponseBody<T> {
    items: {
        item: T[];
    };
    numOfRows: number;
    pageNo: number;
    totalCount: number;
}

interface TourApiResponse<T> {
    response: {
        header: TourApiResponseHeader;
        body: TourApiResponseBody<T>;
    };
}

export interface AreaCodeParams extends Omit<TourApiBaseParams, 'serviceKey' | 'MobileOS' | 'MobileApp'> {
    areaCode?: number;
}

export interface AreaCodeItem {
    rnum: number;
    code: string;
    name: string;
}

const getAreaCode = async (params: AreaCodeParams): Promise<AreaCodeItem[]> => {
    const queryParams: TourApiBaseParams & AreaCodeParams = {
        serviceKey: SERVICE_KEY,
        MobileOS: MOBILE_OS,
        MobileApp: MOBILE_APP,
        _type: 'json',
        numOfRows: params.numOfRows ?? 20,
        pageNo: params.pageNo ?? 1,
        ...params,
    };
    const queryString = new URLSearchParams(
        Object.entries(queryParams).reduce((acc, [key, value]) => {
            if (key !== 'serviceKey' && value !== undefined && value !== null) {
                acc[key] = String(value);
            }
            return acc;
        }, {} as Record<string, string>)
    ).toString();

    const finalQueryString = `${queryString}&serviceKey=${SERVICE_KEY}`;

    const response = await axios.get<TourApiResponse<AreaCodeItem>>(
        `${TOUR_API_BASE_URL}/areaCode1?${finalQueryString}`,
        { timeout: 10000 }
    );

    if (response.data.response.header.resultCode !== '0000') {
        throw new Error(`Tour API Error (areaCode1): ${response.data.response.header.resultMsg}`);
    }
    return response.data.response.body?.items?.item ?? [];
};

export interface AreaBasedListParams extends Omit<TourApiBaseParams, 'serviceKey' | 'MobileOS' | 'MobileApp'> {
    listYN?: 'Y' | 'N';
    arrange?: 'A' | 'B' | 'C' | 'D'; // A=제목순, B=조회순, C=수정일순, D=생성일순
    contentTypeId?: string;
    areaCode?: number;
    sigunguCode?: number;
}

export interface AreaBasedListItem {
    addr1: string;
    addr2?: string;
    areacode: string;
    booktour?: string;
    cat1: string;
    cat2: string;
    cat3: string;
    contentid: string;
    contenttypeid: string;
    createdtime: string;
    firstimage?: string;
    firstimage2?: string;
    cpyrhtDivCd?: string;
    mapx: string;
    mapy: string;
    mlevel?: string;
    modifiedtime: string;
    sigungucode: string;
    tel?: string;
    title: string;
    zipcode?: string;
}

// 지역기반 관광정보 조회 (areaBasedList1)
const getAreaBasedList = async (params: AreaBasedListParams): Promise<AreaBasedListItem[]> => {
    const queryParams: TourApiBaseParams & AreaBasedListParams = {
        serviceKey: SERVICE_KEY,
        MobileOS: MOBILE_OS,
        MobileApp: MOBILE_APP,
        _type: 'json',
        listYN: 'Y',
        arrange: 'A',
        numOfRows: params.numOfRows ?? 20,
        pageNo: params.pageNo ?? 1,
        ...params,
    };
    const queryString = new URLSearchParams(
        Object.entries(queryParams).reduce((acc, [key, value]) => {
            if (key !== 'serviceKey' && value !== undefined && value !== null) { acc[key] = String(value); } return acc;
        }, {} as Record<string, string>)
    ).toString();

    const finalQueryString = `${queryString}&serviceKey=${SERVICE_KEY}`;


    const response = await axios.get<TourApiResponse<AreaBasedListItem>>(
        `${TOUR_API_BASE_URL}/areaBasedList1?${finalQueryString}`,
        { timeout: 10000 }
    );

    if (response.data.response.header.resultCode !== '0000') {
        throw new Error(`Tour API Error (areaBasedList1): ${response.data.response.header.resultMsg}`);
    }
    return response.data.response.body?.items?.item ?? [];
};

export interface SearchKeywordParams extends AreaBasedListParams { 
    keyword: string;
}

// 키워드 검색 조회 (searchKeyword)
const searchKeyword = async (params: SearchKeywordParams): Promise<{ results: AreaBasedListItem[], totalCount: number }> => {
    const queryParams: TourApiBaseParams & Omit<SearchKeywordParams, 'keyword'> & { keyword: string } = {
        serviceKey: SERVICE_KEY,
        MobileOS: MOBILE_OS,
        MobileApp: MOBILE_APP,
        _type: 'json',
        listYN: 'Y',
        arrange: 'A',
        numOfRows: params.numOfRows ?? 20,
        pageNo: params.pageNo ?? 1,
        ...params,
        keyword: params.keyword,
    };
    const queryString = new URLSearchParams(
        Object.entries(queryParams).reduce((acc, [key, value]) => {
            if (key !== 'serviceKey' && value !== undefined && value !== null) { acc[key] = String(value); } return acc;
        }, {} as Record<string, string>)
    ).toString();

    const finalQueryString = `${queryString}&serviceKey=${SERVICE_KEY}`;


    const response = await axios.get<TourApiResponse<AreaBasedListItem>>(
        `${TOUR_API_BASE_URL}/searchKeyword1?${finalQueryString}`,
        { timeout: 10000 }
    );

    if (response.data.response.header.resultCode !== '0000') {
        throw new Error(`Tour API Error (searchKeyword1): ${response.data.response.header.resultMsg}`);
    }
    const results =  response.data.response.body?.items?.item ?? [];
    const totalCount = response.data.response.body?.totalCount ?? 0;

    return {results, totalCount};
};

export interface DetailIntroParams extends Omit<TourApiBaseParams, 'serviceKey' | 'MobileOS' | 'MobileApp'> {
    contentId: string;
    contentTypeId: string;
}

export type DetailIntroItem = Record<string, []>;

// 소개정보 조회 (detailIntro)
const getDetailIntro = async (params: DetailIntroParams): Promise<DetailIntroItem[]> => {
    const queryParams: TourApiBaseParams & DetailIntroParams = {
        serviceKey: SERVICE_KEY,
        MobileOS: MOBILE_OS,
        MobileApp: MOBILE_APP,
        _type: 'json',
        numOfRows: params.numOfRows ?? 10,
        pageNo: params.pageNo ?? 1,
        ...params,
    };
    const queryString = new URLSearchParams(
        Object.entries(queryParams).reduce((acc, [key, value]) => {
            if (key !== 'serviceKey' && value !== undefined && value !== null) { acc[key] = String(value); } return acc;
        }, {} as Record<string, string>)
    ).toString();

    const finalQueryString = `${queryString}&serviceKey=${SERVICE_KEY}`;


    const response = await axios.get<TourApiResponse<DetailIntroItem>>(
        `${TOUR_API_BASE_URL}/detailIntro1?${finalQueryString}`,
        { timeout: 10000 }
    );
    

    if (response.data.response.header.resultCode !== '0000') {
        throw new Error(`Tour API Error (detailIntro1): ${response.data.response.header.resultMsg}`);
    }
    return response.data.response.body?.items?.item ?? [];
};

export const tourAPI = {
    getAreaCode,
    getAreaBasedList,
    searchKeyword,
    getDetailIntro,
};

export type TourAPIType = typeof tourAPI;