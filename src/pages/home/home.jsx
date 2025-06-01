import { HabitsProvider } from '../../context/HabitsContext';
import { DateProvider } from '../../context/DateContext';
import './home.css'
import Calendar from '../../components/Calendar/Calendar';
import Carousel from '../../components/Carousel/Carousel';
import HabitManager from '../../components/habit-manager/habitManager';
import { FormProvider } from '../../context/FormContext';
import HabitForm from '../../components/HabitForm/HabitForm';
import Timer from '../../components/timer/Timer';
import Quote from '../../components/Quote/Quote';
import ToDos from '../../components/ToDos/ToDos';
import { HabitsHistoryProvider } from '../../context/HabitsHistoryContext';
import UserCard from '../../components/userCard/UserCard';
export default function Home() {

    return (
        <>
            <main className='home'>
                <UserCard />
                <Quote />
                <DateProvider>
                    <HabitsProvider>
                        <FormProvider>
                            <HabitForm />
                            <HabitsHistoryProvider>
                                <Carousel>
                                    <HabitManager />
                                    <Calendar />
                                    <Timer />
                                    <ToDos />
                                </Carousel>
                            </HabitsHistoryProvider>
                        </FormProvider>
                    </HabitsProvider>
                </DateProvider>
            </main >
        </>

    )
}