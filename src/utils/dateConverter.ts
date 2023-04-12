const padTo2Digits = (num: number): string => {
    return num.toString().padStart(2, '0');
};
  
export const formatTime = (date: Date) => {
    return [
        padTo2Digits(date.getUTCHours()),
        padTo2Digits(date.getUTCMinutes())
    ].join(':');
};

export const formatDate = (date: Date) => {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('.');
};

export const formatDayName = (date: Date, locale: string = "ru-RU") => {
    const dayName = date.toLocaleDateString(locale, { weekday: 'short' });
    return dayName.charAt(0).toUpperCase() + dayName.slice(1);    
}

export const dateConvert = (date: string): string => {
    const pastDate = new Date(date);
    const today = new Date();
    if (today.getUTCFullYear() - pastDate.getUTCFullYear() === 0 &&
        today.getUTCMonth() - pastDate.getUTCMonth() === 0 &&
        today.getUTCDate() - pastDate.getUTCDate() <= 6)
    {
        if (today.getUTCDate() - pastDate.getUTCDate() < 1) {
            return formatTime(pastDate);
        } else if (today.getUTCDate() - pastDate.getUTCDate() === 1) {
            return "Вчера"
        } else if (today.getUTCDate() - pastDate.getUTCDate() === 2) {
            return "Позавчера"
        } else {
            return formatDayName(pastDate);
        }
    } else {
        return formatDate(pastDate);
    }
}
