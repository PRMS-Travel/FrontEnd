const { StatusCodes } = require("http-status-codes");
const scheduleService = require("../service/schedulesService");

const getSchedules = async (req, res) => {
    const { mapId } = req.query;
    try {
        const results = await scheduleService.getSchedules(mapId);
        
        results.forEach((item) => {
            item.detail = JSON.parse(item.detail);
        });

        return res.status(StatusCodes.OK).json(results);
    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."})
    }
}

const createSchedules = async () => {
    
}

const updateStartTime = async () => {
    
}

const createDetails = async () => {
    
}

const deleteDetails = async () => {
    
}

module.exports = { 
    getSchedules, 
    createSchedules, 
    updateStartTime,
    createDetails,
    deleteDetails 
};