const SQL_SELECT_SCHEDULES = `
    SELECT 
        S.id AS schedulesId,
        S.day,
        S.start_time AS startTime,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'detailId', D.id,
                'placeId', D.place_id,
                'orderBy', D.order_by,
                'playTime', D.play_time,
                'moveTime', D.move_time
            )
        ) AS detail
    FROM schedules S LEFT JOIN schedule_detail D ON S.id = D.schedule_id
    WHERE S.map_id = ?
    GROUP BY S.id, S.day, S.start_time
    ORDER BY S.day
`;

const SQL_INSERT_SCHEDULES = `
    INSERT INTO schedules (day, start_time, map_id) VALUES ?
`;

const SQL_INSERT_DETAILS = `
    INSERT INTO schedule_detail ( schedule_id ,place_id, order_by, play_time, move_time) VALUES ?
`;

const SQL_UPDATE_TIME = `
    UPDATE schedules
       SET start_time = ?
    WHERE id = ?
`;

const SQL_DELETE_SCHEDULES = `
    DELETE FROM schedules WHERE map_id = ?
`;

const SQL_DELETE_DETAIL = `
    DELETE FROM schedule_detail
    WHERE schedule_id IN (
        SELECT id FROM schedules WHERE map_id = ?
    )
`;

module.exports = {
    SQL_SELECT_SCHEDULES,
    SQL_INSERT_SCHEDULES,
    SQL_INSERT_DETAILS,
    SQL_UPDATE_TIME,
    SQL_DELETE_SCHEDULES,
    SQL_DELETE_DETAIL
};