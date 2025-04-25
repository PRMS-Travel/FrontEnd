const express = require('express');
const router = express.Router();
const db = require('../db/mariadb');

router.route('/')
    .get(async (req, res) => {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).send("userId가 없습니다.");
        }

        const sql = `SELECT * FROM maps WHERE user_id = ?`;
        const values = [userId];

        try {
            const [rows] = await db.query(sql, values); 

            if (rows.length === 0) {
                return res.status(404).send("해당 데이터가 없습니다.");
            } else {
                return res.status(200).json(rows);
            }
        } catch (err) {
            console.error("데이터 베이스 서버 오류", err.message);
            return res.status(500).send("데이터 베이스 서버 오류");
        }

    })
    .post(async (req, res) => {
        const NotUserid = 999;
        const userId  = req.body.userId || NotUserid;

        const { mapName } = req.body;
        if (!mapName) {
            return res.status(400).send("mapName이 없습니다.");
        }

        const sql = `INSERT INTO maps (name, user_id) VALUES (?, ?)`;
        const values = [mapName, userId];

        try {
            const [result] = await db.execute(sql, values);
            if (result.affectedRows === 0) {
                return res.status(500).json({
                    message: "지도 생성 실패"
                });
            } else {
                return res.status(200).json({
                    massage : "지도 생성 완료",
                    id : result.insertId,
                    name : mapName,
                    userId : userId == 999 ? "유저가 아닙니다.(999)" : userId,
                });
            }
        } catch (err) {
            console.error("데이터 베이스 서버 오류", err.message);
            return res.status(500).send("데이터 베이스 서버 오류");
        }
    })

router.route('/:mapId')
    .put(async (req, res) => {
        const { mapName } = req.body;
        const { mapId } = req.params;

        if (!mapId || !mapName) {
            return res.status(400).send("mapId 또는 mapName이 없습니다.");
        }

        const sql = `UPDATE maps SET name = ? WHERE id = ?`;
        const values = [mapName, mapId];

        try {
            const [result] = await db.execute(sql, values);
            if (result.affectedRows === 0) {
                return res.status(404).send("해당 데이터가 없습니다.");
            } else {
                return res.status(200).json({
                    massage : "지도 수정 완료",
                    map_id : mapId,
                    name : mapName,
                });
            }
        } catch (err) {
            console.error("데이터 베이스 서버 오류", err.message);
            return res.status(500).send("데이터 베이스 서버 오류");
        }
    })
    .delete( async (req, res) => {
        const { mapId } = req.params;

        if (!mapId) {
            return res.status(400).send("mapId이 없습니다.");
        }

        const sql = `DELETE FROM maps WHERE id = ?`;
        const values = [mapId];

        try {
            const [result] = await db.execute(sql, values);
            console.log(result);
            if (result.affectedRows === 0) {
                return res.status(404).send("해당 데이터가 없습니다.");
            } else {
                return res.status(200).json({
                    massage : "지도 삭제 완료",
                    map_id : mapId,
                });
            }
        } catch (err) {
            console.error("데이터 베이스 서버 오류", err.message);
            return res.status(500).send("데이터 베이스 서버 오류");
        }
    });

module.exports = router;