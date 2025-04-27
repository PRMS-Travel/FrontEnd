const placeService = require("../service/placesService");
const scheduleService = require("../service/schedulesService");
const { StatusCodes } = require("http-status-codes");

const getPlaces = async (req,res) => {
    const { mapId } = req.body;

    if (!mapId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ massage :"전달 데이터를 다시 확인해주세요."});
    }

    try {
        const [result] = await placeService.getPlaces(mapId); 

        if (result.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ massage :"장소가 존재하지 않습니다."});
        } else {
            return res.status(StatusCodes.OK).json(results);
        }
    } catch (error) {
        console.error("서버 오류", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ massage :"서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."});
    }

};

const createPlace = async (req,res) => {
    const {
        contentId,
        contentTypeId,
        add1,
        add2,
        firstImage1,
        firstImage2,
        overview,
        tel,
        hmpg,
        mapId,
        latitude,
        longitude,
        stateCode,
    }  = req.body

    if (!contentId && !latitude) {
        return res.status(StatusCodes.BAD_REQUEST).json({message:"전달 데이터를 다시 확인해주세요."});
    }

    try{
        let result;
        if(contentId){
            result = await placeService.createPlace(contentId, contentTypeId, add1, add2, firstImage1, firstImage2, overview, tel, hmpg, mapId, latitude, longitude, stateCode)
        } else {
            result = await placeService.createOrderPlace( latitude, longitude, add1, add2, mapId, stateCode);
        }

        if (result.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ massage :"생성에 실패하였습니다."});
        } else {
            return res.status(StatusCodes.OK).json({
                massage : "성공적으로 일정 목록을 저장했습니다.",
                id : result.insertId
            });
        }
    } catch (error) {
        console.error("서버 오류", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ massage :"서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."});
    }
};
  


const updateStateCode = async (req,res) => {
    const { placeId } = req.params;

    if (!placeId) {
        return res.status(StatusCodes.BAD_REQUEST).json({message:"placeId이 없습니다."});
    }

    try {
        await scheduleService.runInTransaction(async (connection) => {
            const result = await placeService.getStateCode(placeId,connection);
            await placeService.updateStateCode(result, placeId, connection);
        })

        return res.status(200).json({ massage : "장소 state 업데이트 성공" });
    } catch (error) {
        console.error("서버 오류", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ massage :"서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."});
    }

};

const deletePlaces = async (req,res) => {
    const { placeId } = req.params;

    if (!placeId) {
        return res.status(400).send("전달 데이터를 다시 확인해주세요.");
    }

    try {
        const result = await placeService.deletePlaces(placeId);
        
        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ massage :"장소가 존재하지 않습니다."});
        } else {
            return res.status(StatusCodes.OK).json({
                massage : "성공적으로 데이터가 삭제되었습니다.",
            });
        }
    } catch (err) {
        console.error("DELETE 오류", err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ massage :"서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."});
    }
};

module.exports = {
    getPlaces, createPlace, updateStateCode, deletePlaces
};