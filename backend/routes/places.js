const express = require('express');
const router = express.Router();

const db = require('../db/mariadb');



router.route('/')
    .get(async (req, res) => {
        const { mapId } = req.body;

        if (!mapId) {
            return res.status(400).send("전달 데이터를 다시 확인해주세요.");
        }

        const sql = `SELECT  contentId, contentTypeId, id, add1, add2, firstImage2 FROM places WHERE map_id = ?;`;
        const values = [mapId];

        try {
            const [rows] = await db.query(sql, values); 

            if (rows.length === 0) {
                return res.status(404).send("장소가 존재하지 않습니다.");
            } else {
                return res.status(200).json(rows);
            }
        } catch (err) {
            console.error("서버 오류", err.message);
            return res.status(500).send("서버에서 오류가 발생했습니다. 관리자에게 문의해주세요.");
        }

    })
    .post(async (req, res) => {
        const {
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
            stateCode,
        }  = req.body

        if (!contentId && !latitude) {
            return res.status(400).send("전달 데이터를 다시 확인해주세요.");
        }

        var sql = `INSERT INTO places (latitude, longitude, add1, add2, map_id, state_code`;
        var values = [latitude, longitude, add1, add2, mapId, stateCode];

        if(!contentId){
            sql += `) VALUES (?,?,?,?,?,?);`
        } else {
            sql += `, contentId, contentTypeId, firstimage, firstimage2, overview, tel, hmpg) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`;
            values.push(contentId,
                contentTypeId,
                firstImage1,
                firstImage2,
                overview,
                tel,
                hmpg);
        }
        try {
            const [result] = await db.execute(sql, values);
            if (result.affectedRows === 0) {
                return res.status(500).json({
                    message: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." 
                });
            } else {
                return res.status(200).json({
                    massage : "성공적으로 일정 목록을 저장했습니다.",
                    id : result.insertId
                });
            }
        } catch (err) {
            console.error("오류", err.message);
            return res.status(500).send("오류가 발생했습니다.");
        }
    })

router.route('/:placeId')
    .put(async (req, res) => {
        const { placeId } = req.params;

        if (!placeId) {
            return res.status(400).send("placeId이 없습니다.");
        }
        let values = [placeId];

        const selectSql = `SELECT state_code FROM places WHERE id = ?`;

        try {
            const [result] = await db.query(selectSql, values);
            if (result.affectedRows === 0) {
                return res.status(404).send("해당 데이터가 없습니다.");
            } else {
                const stateCode = result[0].state_code? 0:1;
                values = [stateCode];
                console.log({
                    massage : "state_code 불러오기 성공",
                    state_code : result[0].state_code
                });
            }
        } catch (err) {
            console.error("SELECT 오류", err.message);
            return res.status(500).send("SELECT 서버 오류");
        };
        values.push(placeId);
        const updateSql = `UPDATE places SET state_code = ? WHERE id = ?`;

        try {
            const [result] = await db.execute(updateSql, values);
            if (result.affectedRows === 0) {
                return res.status(404).send("해당 데이터가 없습니다.");
            } else {
                console.log(result);
                return res.status(200).json({
                    massage : "장소 state 업데이트 성공",
                });
            }
        } catch (err) {
            console.error("UPDATE 오류", err.message);
            return res.status(500).send("UPDATE 오류");
        }
    })
    .delete( async (req, res) => {
        const { placeId } = req.params;

        if (!placeId) {
            return res.status(400).send("전달 데이터를 다시 확인해주세요.");
        }

        const sql = `DELETE FROM places WHERE id = ?`;
        const values = [placeId];

        try {
            const [result] = await db.execute(sql, values);
            console.log(result);
            if (result.affectedRows === 0) {
                return res.status(404).send("장소가 존재하지 않습니다.");
            } else {
                return res.status(200).json({
                    massage : "성공적으로 데이터가 삭제되었습니다.",
                });
            }
        } catch (err) {
            console.error("DELETE 오류", err.message);
            return res.status(500).send("서버에서 오류가 발생했습니다. 관리자에게 문의해주세요.");
        }
    });

module.exports = router;
