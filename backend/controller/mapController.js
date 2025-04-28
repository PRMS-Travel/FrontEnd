const mapService = require("../service/mapService");
const {runInTransaction} = require("../utils/transaction");
const schedulesService = require("../service/schedulesService")
const { StatusCodes } = require("http-status-codes");

const getMap = async (req,res) => {
    const { userId } = req.body;

    try{
        const results = await mapService.getMap(userId);

        if (results.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ massage : "해당 데이터가 없습니다."});
        } else {
            return  res.status(StatusCodes.OK).json(results);
        }
    } catch (error) {
        console.error("데이터 베이스 서버 오류", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ massage : "데이터 베이스 서버 오류"});
    }  
};

const createMap = async (req,res) => {
    const NotUserid = 999;
    // 난수같은 지정값을 정해야하지만 userId가 외래키라 어케할지 고민중

    const userId  = req.body.userId || NotUserid;
    const { firstMapName, startDay, endDay } = req.body;
    // 프론트에서 초기값은 여행지의 이름으로 받고 저장버튼시 updateMap도 같이
    
    const schedulesDay = (new Date(endDay).getTime() - new Date(startDay).getTime()) / (1000*60*60*24);

    try {
        let result;
        await runInTransaction(async (connection) => {
            result = await mapService.createMap(firstMapName,userId,connection);
            await schedulesService.createSchedules(startDay , schedulesDay, result.insertId, connection);
        })

        return res.status(StatusCodes.CREATED).json({
            massage : "지도 및 스케쥴 생성 완료",
            id : result.insertId,
            name : firstMapName,
            userId : userId == 999 ? "유저가 아닙니다.(999)" : userId,
            // 난수같은 지정값을 정해야하지만 userId가 외래키라 어케할지 고민중
        });  
    } catch (error) {
        console.error("데이터 베이스 서버 오류", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ massage : "데이터 베이스 서버 오류"});
    } 
};

const updateMap = async (req,res) => {
    const { mapName } = req.body;
    const { mapId } = req.params;

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