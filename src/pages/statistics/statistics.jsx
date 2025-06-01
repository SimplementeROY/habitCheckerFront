import HabitBreakdown from "../../components/HabitBreakDown/HabitBreakDown"
import HabitsStats from "../../components/HabitsStats/HabitsStats"
import WeeklyAnalysisChart from "../../components/WeekAnalysis/WeekAnalysisChart"
import CompletionRate from "../../components/CompletionRate/CompletionRate"
import TotalCompletions from "../../components/TotalCompletions/TotalCompletions"
import './statistics.css'

export default function Statistics() {

    return (
        <main className="statistics">
            <TotalCompletions />
            <CompletionRate />
            <HabitBreakdown />
            <WeeklyAnalysisChart />
            <HabitsStats />
        </main>
    )
}