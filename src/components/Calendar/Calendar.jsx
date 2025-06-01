import { useState, useEffect } from "react";
import './Calendar.css'
import { useHabitsHistory } from "../../context/HabitsHistoryContext";
import Loader from "../Loader/Loader";

const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

const Calendar = () => {

    const { isLoading, habitsHistory } = useHabitsHistory();
    const [date, setDate] = useState(new Date());
    const [currYear, setCurrYear] = useState(date.getFullYear());
    const [currMonth, setCurrMonth] = useState(date.getMonth());
    const [days, setDays] = useState([]);

    useEffect(() => {
        setDays(generateDaysArray(currYear, currMonth, date, habitsHistory, setDate));
    }, [currMonth, currYear, date, habitsHistory]);

    const handlePrevNext = (direction) => {
        let newMonth = direction === "prev" ? currMonth - 1 : currMonth + 1;
        let newDate = new Date(currYear, newMonth, 1);
        setCurrYear(newDate.getFullYear());
        setCurrMonth(newDate.getMonth());
    };

    if (isLoading) {

        return (
            <div className="wrapper">
                <Loader />
            </div>

        )
            ;
    }

    return (
        <div className="wrapper">
            <header>
                <p className="current-date">{months[currMonth]} {currYear}</p>
                <div className="icons">
                    <span className="material-symbols-rounded" onClick={() => handlePrevNext("prev")}>&lt;</span>
                    <span className="material-symbols-rounded" onClick={() => handlePrevNext("next")}>&gt;</span>
                </div>
            </header>
            <div className="calendar">
                <ul className="weeks">
                    <li>Sun</li>
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wed</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                </ul>
                <ul className="days">{days}</ul>
            </div>
        </div>
    );
};

const generateDaysArray = (year, month, currentDate, habitsHistory, handleDate) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDateOfLastMonth = new Date(year, month, 0).getDate();

    let daysArray = [];
    for (let i = firstDayOfMonth; i > 0; i--) {
        daysArray.push(<CalendarDay key={`prev-${i}`} day={lastDateOfLastMonth - i + 1} inactive />);
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        const date = new Date(year, month, i);
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
        const habit = habitsHistory.find(h => h.completed_date === dateStr);
        const bgColor = habit ? getDayColor(parseFloat(habit.completion_rate)) : "";

        let isSelected = formatDate(date) === formatDate(currentDate);

        daysArray.push(<CalendarDay key={`current-${i}`} day={i} isSelected={isSelected} bgColor={bgColor} date={date} handleDate={handleDate} />);
    }

    return daysArray;
};

const getDayColor = (percentage) => {
    if (percentage <= 25) {
        // Pastel red
        return "rgba(255, 182, 193, 0.6)"; // lightpink
    } else if (percentage <= 70) {
        // Pastel yellow
        return "rgba(255, 255, 153, 0.6)"; // light yellow
    } else {
        // Pastel green
        return "rgba(144, 238, 144, 0.6)"; // lightgreen
    }
};
const formatDate = (date) => date.toLocaleDateString("en-CA");

const CalendarDay = ({ day, isSelected, inactive = false, bgColor = "", date, handleDate }) => {

    const handleChangeDay = () => {
        handleDate(date)
    }

    return (
        <button
            className={inactive ? "inactive" : isSelected ? "active" : ""}
            style={{ backgroundColor: bgColor }}
            onClick={handleChangeDay}
        >
            {day}
        </button>
    );
};

export default Calendar;
