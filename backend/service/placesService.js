const pool = require("../db/mariadb");


const getPlaces = async (mapId) => {
    const connection = await pool.getConnection();
    const sql = `SELECT  contentId, contentTypeId, id, add1, add2, firstImage2 FROM places WHERE map_id = ? AND state_code=0;`;
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
        longitude
    ) => {

    const connection = await pool.getConnection();

    const sql = `INSERT INTO places (latitude, longitude, add1, add2, map_id, contentId, contentTypeId, firstimage, firstimage2, overview, tel, hmpg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
    const values = [
        latitude,
        longitude,
        add1,
        add2,
        mapId,
        contentId,
        contentTypeId,
        firstImage1,
        firstImage2,
        overview,
        tel,
        hmpg
        ];

        try {
            const results = await connection.execute(sql, values);
            return results;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
};

const createOrderPlace = async (latitude, longitude, add1, add2, mapId) => {
    const connection = await pool.getConnection();
    const sql = `INSERT INTO places (latitude, longitude, add1, add2, map_id VALUES (?,?,?,?,?);`;
    const values = [latitude, longitude, add1, add2, mapId];

    try {
        const [results] = await connection.execute(sql, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }

};


const updateStateCode = async (stateCode, placeId) => {
    const connection = await pool.getConnection();
    const updateSql = `UPDATE places SET state_code = ? WHERE id = ?`;
    const values = [stateCode, parseInt(placeId)];

    try{
        const [results] = await connection.execute(updateSql, values);
        return results;
    } catch (error){
        throw error;
    } finally {
        connection.release();
    }

};

const deletePlaces = async (placeId) => {
    const connection = await pool.getConnection();
    const sql = `DELETE FROM places WHERE id = ?`;
    const values = [placeId];

    try {
        const [results] = await connection.execute(sql, values);
        return results;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    getPlaces, createPlace, updateStateCode, deletePlaces, createOrderPlace
};