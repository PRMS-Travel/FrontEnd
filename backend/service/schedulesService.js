const pool = require("../db/mariadb");
const { SQL_SELECT_SCHEDULES, SQL_INSERT_SCHEDULES, SQL_INSERT_DETAILS, SQL_UPDATE_TIME, SQL_DELETE_SCHEDULES, SQL_DELETE_DETAIL } = require("../db/schedules.sql");

const getSchedules = async (mapId) => {
    const sql = SQL_SELECT_SCHEDULES;
    const connection = await pool.getConnection();

    try {
        const [results] = await connection.query(sql, [mapId]);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const createSchedules = async (startDay, schedulesDay, mapId, connection) => {
    const sql = SQL_INSERT_SCHEDULES;
    const values = [];

    const startDate = new Date(startDay);
    startDate.setHours(startDate.getHours() + 18);
    // 18 : 표준시간으로부터 한국시간 9 + 오전 9시를 초기시간으로 세팅

    for(let i=0;i<=schedulesDay;i++){
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i)

        values.push([
            i+1,
            currentDate,
            mapId
        ])
    }
    
    try {
        const [results] = await connection.query(sql, [values]);

        if(results.affectedRows !== values.length) {
            throw new Error("일부 삽입 실패");
        }

        return results;
    } catch (error) {
        throw error;
    }
};

const createDetails = async ( details, connection) => {
    const sql = SQL_INSERT_DETAILS;
    const values = [];

    details.map((item) => values.push(Object.values(item)));
    
    try {
        const [results] = await connection.query(sql, [values]);

        if(results.affectedRows !== details.length) {
            throw new Error("일부 삽입 실패");
        }

        return results;
    } catch (error) {
        throw error;
    }
};

const updateStartTime = async (startTime, scheduleId) => {
    const sql = SQL_UPDATE_TIME;
    const values = [startTime, scheduleId];
    const connection = await pool.getConnection();

    try {
        const [results] = await connection.query(sql, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const deleteSchedules = async (mapId) => {
    const sql = SQL_DELETE_SCHEDULES;
    const connection = await pool.getConnection();

    try {
        const [results] = await connection.query(sql, [mapId]);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const deleteDetails = async (mapId) => {
    const sql = SQL_DELETE_DETAIL;
    const connection = await pool.getConnection();

    try {
        const [results] = await connection.query(sql, [mapId]);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const runInTransaction = async (callback) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        await callback(connection);

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = { 
    getSchedules, 
    createSchedules, 
    updateStartTime,
    createDetails,
    deleteSchedules,
    deleteDetails,
    runInTransaction
};