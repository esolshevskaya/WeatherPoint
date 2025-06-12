export const formatLocalTime = (unixTime, timezone) => {
    const utcMilliseconds = unixTime * 1000;
    const localMilliseconds = utcMilliseconds + timezone * 1000;
    const localDate = new Date(localMilliseconds);

    return {
        time: localDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }),
        date: localDate.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }),
    };
};