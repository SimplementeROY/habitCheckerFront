import { useState, useEffect, useCallback, useRef } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import './Timer.css'

// Utilidad para obtener duración por tipo
const getTimeByTab = (tab) => {
    switch (tab) {
        case "pomodoro":
            return 25 * 60;
        case "short":
            return 5 * 60;
        case "long":
            return 15 * 60;
        default:
            return 25 * 60;
    }
};

// Formatear segundos a MM:SS
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

// === Componentes ===

const TabButtons = ({ activeTab, onChange }) => (
    <div className="tab-buttons">
        {["pomodoro", "short", "long"].map((tab) => (
            <button
                key={tab}
                onClick={() => onChange(tab)}
                style={{
                    color: activeTab === tab ? "#000" : "#888",
                    backgroundColor: activeTab === tab ? "#fff" : "transparent",
                    borderRadius: "4px",
                }}
            >
                {tab === "pomodoro" ? "Pomodoro" : tab === "short" ? "Short Break" : "Long Break"}
            </button>
        ))}
    </div>
);

const TimerCircle = ({ timeLeft, progress }) => (
    <div className="timer-circle">
        <div />
        <svg>
            <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="black"
                strokeWidth="8"
                strokeDasharray="376.8"
                // strokeDashoffset={2 * Math.PI * (0.45 * 64) * (1 - progress / 100)}
                strokeDashoffset={376.8 - (376.8 * progress) / 100}
            />
        </svg>
        <div className="time">
            {formatTime(timeLeft)}
        </div>
    </div>
);

const ControlButtons = ({ isRunning, onToggle, onReset }) => (
    <div className="timer-buttons" >
        <button onClick={onToggle}>
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button onClick={onReset}>
            <RotateCcw size={16} />
        </button>
    </div>
);

// === Componente principal ===

export default function Timer() {
    const [activeTab, setActiveTab] = useState("pomodoro");
    const [timeLeft, setTimeLeft] = useState(getTimeByTab("pomodoro"));
    const [isRunning, setIsRunning] = useState(false);

    const alarmRef = useRef(null); // Referencia para el sonido

    useEffect(() => {
        setTimeLeft(getTimeByTab(activeTab));
        setIsRunning(false);
    }, [activeTab]);

    useEffect(() => {
        let interval = null;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            if (alarmRef.current) {
                alarmRef.current.play(); // Reproduce el sonido
            }
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft, activeTab]);

    const toggleTimer = useCallback(() => setIsRunning((r) => !r), []);
    const resetTimer = useCallback(() => {
        setTimeLeft(getTimeByTab(activeTab));
        setIsRunning(false);
    }, [activeTab]);

    const progress = ((getTimeByTab(activeTab) - timeLeft) / getTimeByTab(activeTab)) * 100;

    return (
        <section className="timer">
            {/* Reproductor de audio oculto */}
            <audio ref={alarmRef} src="\sounds\alarma.mp3" preload="auto" />

            <TabButtons activeTab={activeTab} onChange={setActiveTab} />
            <TimerCircle timeLeft={timeLeft} progress={progress} />
            <ControlButtons isRunning={isRunning} onToggle={toggleTimer} onReset={resetTimer} />

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#555" }}>
                <div>
                    {activeTab === "pomodoro"
                        ? "Focus time"
                        : activeTab === "short"
                            ? "Short break"
                            : "Long break"}
                </div>
            </div>
        </section>
    );
}
