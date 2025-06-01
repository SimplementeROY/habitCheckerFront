import { createContext, useContext, useState } from 'react';
import { DAYS_OF_WEEK } from '../variables/daysOfTheWeek';

const DateContext = createContext();
const dayIndexMap = [6, 0, 1, 2, 3, 4, 5];

export const DateProvider = ({ children }) => {
    const today = new Date().toISOString().split('T')[0];
    const todayIndex = dayIndexMap[new Date().getDay()];
    const todayDay = DAYS_OF_WEEK[todayIndex].eng;

    const [date, setDate] = useState(today);
    const [day, setDay] = useState(todayDay);

    return (
        <DateContext.Provider value={{ date, setDate, day, setDay }}>
            {children}
        </DateContext.Provider>
    );
};

export const useDate = () => useContext(DateContext);
