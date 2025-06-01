import './ProgressBar.css'

export default function ProgressBar({ percentage }) {
    return (
        <div className="progress-bar-container">

            <div className="progress-bar">
                <div className="progress" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
}