import React, { useState, useMemo } from "react";
import "./Carousel.css"; // Asegúrate de incluir los estilos actualizados

const Carousel = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHabitTabSelected, setisHabitTabSelected] = useState(true)
    const handleNavigate = (index) => {
        setCurrentIndex(index);
    };

    const handleTab = (selection) => {
        setisHabitTabSelected(selection)
    }

    const iconList = useMemo(() => [
        <i className="fa-solid fa-star"></i>,
        <i className="fa-regular fa-calendar"></i>,
        <i className="fa-solid fa-clock"></i>,
        <i className="fa-solid fa-list"></i>
    ], []);

    return (
        <>
            <div className="carousel-container">
                <div className="carousel-labels">
                    <div
                        className="selector"
                        style={{
                            transform: `translateX(calc(${currentIndex * 100}% + ${currentIndex * 0.5}rem))`,
                            width: `calc(100% / ${React.Children.count(children)} - 0.5rem)`
                        }}
                    ></div>
                    {React.Children.map(children, (_, index) => (
                        <button
                            key={index}
                            className={`carousel-button ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => handleNavigate(index)}
                        >
                            {iconList[index]}
                        </button>
                    ))}
                </div>
                <div
                    className="carousel-inner"
                    style={{
                        transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 3}rem))`,
                    }}
                >
                    <div className="tab">
                        <button onClick={() => handleTab(true)} className={isHabitTabSelected ? "selected" : ""}>Habits</button>
                        <button onClick={() => handleTab(false)} className={isHabitTabSelected ? "" : "selected"}>To Dos</button>
                    </div>
                    {React.Children.map(children, (child, index) => (
                        <div className="carousel-item">{child}</div>
                    ))}
                </div>
            </div>

        </>
    );
};

export default Carousel;
