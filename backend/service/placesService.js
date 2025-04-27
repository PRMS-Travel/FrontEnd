const pool = require("../db/mariadb");


const getPlaces = async (mapId) => {
    const connection = await pool.getConnection();
    const sql = `SELECT  contentId, contentTypeId, id, add1, add2, firstImage2 FROM places WHERE map_id = ?;`;
    const values = [mapId];

    try {
        const [results] = await connection.query(sql, values); 
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const createPlace = async (
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
        stateCode
    ) => {

    const connection = await pool.getConnection();

    const sql = `INSERT INTO places (latitude, longitude, add1, add2, map_id, state_code, contentId, contentTypeId, firstimage, firstimage2, overview, tel, hmpg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const values = [
        latitude,
        longitude,
        add1,
        add2,
        mapId,
        stateCode,
        contentId,
        contentTypeId,
        firstImage1,
        firstImage2,
        overview,
        tel,
        hmpg];

        try {
            const results = await connection.execute(sql, values);
            return results;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
};

const createOrderPlace = async (latitude, longitude, add1, add2, mapId, stateCode) => {
    const connection = await pool.getConnection();
    const sql = `INSERT INTO places (latitude, longitude, add1, add2, map_id, state_code) VALUES (?,?,?,?,?,?);`;
    const values = [latitude, longitude, add1, add2, mapId, stateCode];

    try {
        const results = await connection.execute(sql, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }

};

const getStateCode = async (placeId, connection) => {
    const selectSql = `SELECT state_code FROM places WHERE id = ?`;
    const values = [placeId];

    try{
        const results = await connection.query(selectSql, values);
        return results;
    } catch (error) {
        throw error;
    }

};

const updateStateCode = async (StateCode, placeId, connection) => {
    const updateSql = `UPDATE places SET state_code = ? WHERE id = ?`;
    stateCode = StateCode[0][0].state_code? 0:1;
    const values = [stateCode, parseInt(placeId)];
    console.log(values);

    try{
        const [result] = await connection.execute(updateSql, values);
        return [result];
    } catch (error){
        throw error;
    }
};

const deletePlaces = async (placeId) => {
    const connection = await pool.getConnection();
    const sql = `DELETE FROM places WHERE id = ?`;
    const values = [placeId];

    try {
        const [result] = await connection.execute(sql, values);
        return result;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    getPlaces, createPlace, getStateCode, updateStateCode, deletePlaces, createOrderPlace
};