const mapService = require("../service/mapService");
const { StatusCodes } = require("http-status-codes");

const getMap = async (req,res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ massage : "userId가 없습니다."});
    }

    try{
        const results = await mapService.getMap(userId);

        if (results.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ massage : "해당 데이터가 없습니다."});
        } else {
            return res.status(StatusCodes.OK).json(results);
        }
    } catch (error) {
        console.error("데이터 베이스 서버 오류", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ massage : "데이터 베이스 서버 오류"});
    } 
};

const createMap = async (req,res) => {
    const NotUserid = 999;
    const userId  = req.body.userId || NotUserid;
    const { mapName } = req.body;

    if (!mapName) {
        return res.status(StatusCodes.BAD_REQUEST).json({ massage : "mapName이 없습니다."});
    }

    try {
        const result = await mapService.createMap(userId,mapName);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "지도 생성 실패"
            });
        } else {
            return res.status(StatusCodes.CREATED).json({
                massage : "지도 생성 완료",
                id : result.insertId,
                name : mapName,
                userId : userId == 999 ? "유저가 아닙니다.(999)" : userId,
            });
        }
    } catch (error) {
        console.error("데이터 베이스 서버 오류", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ massage : "데이터 베이스 서버 오류"});
    } 
};

const updateMap = async (req,res) => {
    const { mapName } = req.body;
    const { mapId } = req.params;

    if (!mapId || !mapName) {
        return res.status(StatusCodes.BAD_REQUEST).json({ massage :"mapId 또는 mapName이 없습니다."});
    }

    try {
        const [result] = await mapService.updateMap(mapName,mapId);
        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ massage :"해당 데이터가 없습니다."});
        } else {
            return res.status(StatusCodes.OK).json({
                massage : "지도 수정 완료",
                map_id : mapId,
                name : mapName,
            });
        }
    } catch (error) {
        console.error("데이터 베이스 서버 오류", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ massage :"데이터 베이스 서버 오류"});
    }

};

const deleteMap = async (req,res) => {
    const { mapId } = req.params;

    if (!mapId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ massage :"mapId이 없습니다."});
    }

    try {
        const [result] = await mapService.deleteMap(mapId);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ massage :"해당 데이터가 없습니다."});
        } else {
            return res.status(StatusCodes.OK).json({
                massage : "지도 삭제 완료",
                map_id : mapId,
            });
        }
    } catch (error) {
        console.error("데이터 베이스 서버 오류", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ massage :"데이터 베이스 서버 오류"});
    }

};

module.exports = {
    getMap, createMap, updateMap, deleteMap
};