const pool = require("../db/mariadb");
const { SQL_GET_SCHEDULES } = require("../db/sql");

const getSchedules = async (mapId) => {
    const sql = SQL_GET_SCHEDULES;
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

const createSchedules = async (mapId) => {
    const sql = "";
    const connection = await pool.getConnection();

    try {
        const [results] = await connection.query(sql, mapId);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const updateStartTime = async (mapId) => {
    const sql = "";
    const connection = await pool.getConnection();

    try {
        const [results] = await connection.query(sql, mapId);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const createDetails = async (mapId) => {
    const sql = "";
    const connection = await pool.getConnection();

    try {
        const [results] = await connection.query(sql, mapId);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const deleteDetails = async (mapId) => {
    const sql = "";
    const connection = await pool.getConnection();

    try {
        const [results] = await connection.query(sql, mapId);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

module.exports = { 
    getSchedules, 
    createSchedules, 
    updateStartTime,
    createDetails,
    deleteDetails 
};