export function addMinutesToTime(timeStr: string, minutesToAdd: number | null | undefined): string {
    if (!timeStr || !/^\d{2}:\d{2}$/.test(timeStr)) {
        console.warn("addMinutesToTime: 유효하지 않은 시간 형식입니다. 'HH:mm'이 필요합니다. 입력:", timeStr);
        return "??:??";
    }

    if (minutesToAdd === null || minutesToAdd === undefined || isNaN(minutesToAdd)) {
        console.warn("addMinutesToTime: 유효하지 않은 'minutesToAdd' 값입니다. 입력:", minutesToAdd);
        return timeStr;
    }

    const [hours, minutes] = timeStr.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes + minutesToAdd;

    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;

    const formattedHours = String(newHours).padStart(2, '0');
    const formattedMinutes = String(newMinutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}
