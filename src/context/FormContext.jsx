import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [editHabit, setEditHabit] = useState(null);

    const openForm = (habit = null) => {
        setEditHabit(habit)
        setIsOpen(true)
    };
    const closeForm = () => {
        setEditHabit(null)
        setIsOpen(false)
    };

    return (
        <FormContext.Provider value={{ openForm, closeForm, isOpen, editHabit }}>
            {children}
        </FormContext.Provider>
    );
};

export const useForm = () => useContext(FormContext);