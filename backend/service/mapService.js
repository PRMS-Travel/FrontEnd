const pool = require("../db/mariadb");

const getMap = async (userId)=> {
    const connection = await pool.getConnection();
    const sql = `SELECT * FROM maps WHERE user_id = ?`;

    try {
        const [results] = await connection.query(sql, [userId]); 
        return results;
    } catch (err) {
        throw error;
    } finally{
        connection.release();
    }
};

const createMap = async (mapName, userId) => {
    const sql = `INSERT INTO maps (name, user_id) VALUES (?, ?)`;
    const connection = await pool.getConnection();
    const values = [mapName,userId];

    try {
        const [results] = await connection.execute(sql, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }

};

const updateMap = async (mapName, mapId) => {
    const sql = `UPDATE maps SET name = ? WHERE id = ?`;
    const connection = await pool.getConnection();
    const values = [mapName, mapId];
    console.log(values);
    
    try {
        const results = await connection.execute(sql, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const deleteMap = async (mapId) => {
    const connection = await pool.getConnection();

    const sql = `DELETE FROM maps WHERE id = ?`;
    const values = [mapId];

    try {
        const results = await connection.execute(sql, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

module.exports = {
    getMap, createMap, updateMap, deleteMap
};