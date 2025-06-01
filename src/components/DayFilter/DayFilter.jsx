import './DayFilter.css';
import { useMemo, useCallback } from 'react';
import { useDate } from '../../context/DateContext';
import { DAYS_OF_WEEK } from '../../variables/daysOfTheWeek';

export default function DayFilter() {
    const today = useMemo(() => new Date(), []);
    const todayISO = today.toISOString().split('T')[0];

    const { setDate, setDay, date } = useDate();

    const getMonday = useCallback((date) => {
        const day = date.getDay();
        const diff = (day === 0 ? -6 : 1) - day;
        const monday = new Date(date);
        monday.setDate(date.getDate() + diff);
        return monday;
    }, []);

    const generateDays = useCallback((startDate, numWeeks) => {
        const days = [];
        for (let week = numWeeks; week >= 0; week--) {
            for (let i = 0; i < 7; i++) {
                const day = new Date(startDate);
                day.setDate(startDate.getDate() - week * 7 + i);
                const fullDate = day.toISOString().split('T')[0];
                days.push({
                    key: fullDate,
                    dayName: DAYS_OF_WEEK[i].eng.slice(0, 3),
                    fullDayName: DAYS_OF_WEEK[i].eng,
                    dayNumber: day.getDate(),
                    fullDate,
                });
            }
        }
        return days.reverse();
    }, []);

    const pastDays = useMemo(() => {
        const monday = getMonday(today);
        return generateDays(monday, 3);
    }, [getMonday, generateDays, today]);

    const handleChange = useCallback((fullDate, fullDayName) => {
        setDate(fullDate);
        setDay(fullDayName);
    }, [setDate, setDay]);

    return (
        <div className="day-filter">
            {pastDays.map(({ key, dayName, fullDayName, dayNumber, fullDate }) => {
                const isToday = fullDate === todayISO;
                const isSelected = fullDate === date;

                let className = 'date';
                if (isToday) className += ' today';
                if (isSelected) className += ' selected';

                return (
                    <label key={key} htmlFor={key} className={className}>
                        <span>{dayName}</span> <span>{dayNumber}</span>
                        <input
                            type="radio"
                            id={key}
                            name="day"
                            checked={isSelected}
                            onChange={() => handleChange(fullDate, fullDayName)}
                        />
                    </label>
                );
            })}
        </div>
    );
}
