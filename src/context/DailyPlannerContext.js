import { createContext, useContext, useReducer } from 'react';

const DailyPlannerContext = createContext();

const initialState = {
  isDarkMode: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'onDarkMode':
      return { ...state, isDarkMode: !state.isDarkMode };

    default:
      throw new Error('Unknown action');
  }
}

function DailyPlannerProvider({ children }) {
  const [{ isDarkMode }, dispatch] = useReducer(reducer, initialState);

  function handleDarkMode() {
    dispatch({ type: 'onDarkMode' });
  }

  return (
    <DailyPlannerContext.Provider value={{ isDarkMode, handleDarkMode }}>
      {children}
    </DailyPlannerContext.Provider>
  );
}

function useDailyPlanner() {
  const context = useContext(DailyPlannerContext);
  if (context === undefined)
    throw new Error('DailyPlannerContext was use otuside DailyPlannerProvider');
  return context;
}

export { useDailyPlanner, DailyPlannerProvider };
