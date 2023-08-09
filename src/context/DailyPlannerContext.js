import { createContext, useContext, useReducer } from 'react';
import useLocalStorageState from '../hooks/useLocalStorageState';

const MY_DAILY_TODOLIST = [
  {
    id: crypto.randomUUID(),
    status: false,
    body: 'Morning learning - 1h',
  },
  {
    id: crypto.randomUUID(),
    status: false,
    body: 'Workout',
  },
  {
    id: crypto.randomUUID(),
    status: false,
    body: 'Cold shower',
  },
  {
    id: crypto.randomUUID(),
    status: false,
    body: 'Work - 8h',
  },
  {
    id: crypto.randomUUID(),
    status: false,
    body: 'English learning - 30min',
  },
  {
    id: crypto.randomUUID(),
    status: false,
    body: 'Family time',
  },
  {
    id: crypto.randomUUID(),
    status: false,
    body: 'Evening learning - 1h',
  },
  {
    id: crypto.randomUUID(),
    status: false,
    body: 'Stretching and breath work!',
  },
];

const DailyPlannerContext = createContext();

const initialState = {
  isDarkMode: false,
  myDailyTodoList: MY_DAILY_TODOLIST,
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
  const [{ isDarkMode, myDailyTodoList }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [myTodos, setMyTodos] = useLocalStorageState(myDailyTodoList, 'todo');

  function handleDarkMode() {
    dispatch({ type: 'onDarkMode' });
  }

  return (
    <DailyPlannerContext.Provider
      value={{ isDarkMode, handleDarkMode, myTodos }}
    >
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
