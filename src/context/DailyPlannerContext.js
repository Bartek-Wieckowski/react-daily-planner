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
    case 'item/created':
      return {
        ...state,
        myDailyTodoList: [...state.myDailyTodoList, action.payload],
      };
    case 'item/changeStatus':
      return {
        ...state,
        myDailyTodoList: [...state.myDailyTodoList, action.payload],
      };
    case 'item/edited':
      return {
        ...state,
        myDailyTodoList: [...state.myDailyTodoList, action.payload],
      };

    default:
      throw new Error('Unknown action');
  }
}

function DailyPlannerProvider({ children }) {
  const [{ isDarkMode }, dispatch] = useReducer(reducer, initialState);
  const [myDailyTodoList, setMyDailyTodoList] = useLocalStorageState(
    MY_DAILY_TODOLIST,
    'todo'
  );

  function handleDarkMode() {
    dispatch({ type: 'onDarkMode' });
  }
  function createdItem(newItem) {
    dispatch({ type: 'item/created', payload: newItem });
    setMyDailyTodoList([...myDailyTodoList, newItem]);
  }
  function changeStatusItem(id) {
    dispatch({ type: 'item/changeStatus', payload: id });
    setMyDailyTodoList((myDailyTodoList) =>
      myDailyTodoList.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, status: !todoItem.status }
          : todoItem
      )
    );
  }
  function editedItem(id, newBody) {
    setMyDailyTodoList((myDailyTodoList) =>
      myDailyTodoList.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, body: newBody } : todoItem
      )
    );
  }

  return (
    <DailyPlannerContext.Provider
      value={{
        myDailyTodoList,
        isDarkMode,
        handleDarkMode,
        createdItem,
        changeStatusItem,
        editedItem,
      }}
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
