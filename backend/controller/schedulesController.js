const { StatusCodes } = require("http-status-codes");
const scheduleService = require("../service/schedulesService");

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

const createSchedules = async (req, res) => {
    const { schedules, details } = req.body;

    try {
        // 저장버튼 클릭 시 한번에 처리
        // 백엔드 논의 - 스케줄은 map 만들 때 동시 생성? (시간 변경, 변경 저장 시 처리 등의 이유)
        await scheduleService.runInTransaction(async (connection) => {
            // 1. 일정 생성
            const result = await scheduleService.createSchedules(schedules, connection);
    
            // 2. detail 생성
            await scheduleService.createDetails(result.insertId, details, connection);
        });

        return res.status(StatusCodes.CREATED).end();
    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."});
    }
}

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
    createSchedules, 
    updateStartTime,
    deleteSchedules,
    deleteDetails 
};