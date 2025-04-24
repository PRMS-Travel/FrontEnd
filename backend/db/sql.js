const SQL_GET_SCHEDULES = `SELECT 
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
                            ORDER BY S.day`;

module.exports = {
    SQL_GET_SCHEDULES
};