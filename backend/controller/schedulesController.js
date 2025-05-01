const { StatusCodes } = require("http-status-codes");
const scheduleService = require("../service/schedulesService");
const {runInTransaction} = require("../utils/transaction")

const getSchedules = async (req, res) => {
    const { mapId } = req.query;
    try {
        const results = await scheduleService.getSchedules(mapId);
        
        if(results.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message : "일치하는 일정 목록을 찾지 못했습니다."});
        }
        
        results.forEach((item) => {
            item.detail = JSON.parse(item.detail);
        });

        return res.status(StatusCodes.OK).json(results);
    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."});
    }
}

const createDetails = async (req, res) => {
    const { details } = req.body;

    try {
        await runInTransaction(async (connection) => {
            await scheduleService.createDetails( details, connection);
        });

        return res.status(StatusCodes.CREATED).end();
    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."});
    } 
}
// 저장버튼을 할때 starttime, details를 delete -> insert 순으로 실행
const updateStartTime = async (req, res) => {
    const { startTime, scheduleId } = req.body;

    try {
        const result = await scheduleService.updateStartTime(startTime, scheduleId);

        if(result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message : "일치하는 일정 목록을 찾지 못했습니다." });
        }

        return res.status(StatusCodes.OK).end();
    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."});
    }
}

// 일단 만들었으나, 지도 삭제 시 deleteSchedules, deleteDetail, deleteMap 등을
// 한번에 호출할 가능성 있음 -> 백엔드 논의 후 삭제
// 데이터베이스의 외래키 속성 사용 (부모데이터 삭제시 자식데이터 삭제)

const deleteSchedules = async (req, res) => {
    const { mapId } = req.query;
    try {
        const results = await scheduleService.deleteSchedules(mapId);
    
        if(results.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message : "일치하는 지도를 찾지 못했습니다."});
        }

        return res.status(StatusCodes.OK).end();
    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."});
    }
}

const deleteDetails = async (req, res) => {
    const { mapId } = req.query;
    try {
        const results = await scheduleService.deleteDetails(mapId);
    
        if(results.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message : "일치하는 지도를 찾지 못했습니다."});
        }

        return res.status(StatusCodes.OK).end();
    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."});
    }
}

module.exports = { 
    getSchedules, 
    createDetails, 
    updateStartTime, 
    deleteSchedules,
    deleteDetails 
};