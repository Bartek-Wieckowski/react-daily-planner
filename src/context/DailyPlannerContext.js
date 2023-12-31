import { createContext, useContext, useEffect, useReducer } from 'react';
import useLocalStorageState from '../hooks/useLocalStorageState';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  isLoading: true,
  myDailyTodoList: MY_DAILY_TODOLIST,
  sortingOptions: 'order',
};

function reducer(state, action) {
  switch (action.type) {
    case 'startLoading':
      return { ...state, isLoading: true };
    case 'stopLoading':
      return { ...state, isLoading: false };
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
    case 'item/deleted':
      return {
        ...state,
        myDailyTodoList: [...state.myDailyTodoList, action.payload],
      };
    case 'items/sort':
      return { ...state, sortingOptions: action.payload };
    case 'items/deleted':
      return {
        ...state,
        myDailyTodoList: [],
      };
    case 'notify':
      action.payload.notify(action.payload.type, action.payload.message);
      return { ...state };

    default:
      throw new Error('Unknown action');
  }
}

function DailyPlannerProvider({ children }) {
  const [{ isDarkMode, sortingOptions, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [myDailyTodoList, setMyDailyTodoList] = useLocalStorageState(
    MY_DAILY_TODOLIST,
    'todo'
  );
  const countCompletedTodoItem = myDailyTodoList.filter(
    (todoItem) => todoItem.status
  ).length;

  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight - now;

    function resetLocalStorage() {
      localStorage.removeItem('todo');
    }
    const intervalID = setInterval(resetLocalStorage, timeUntilMidnight);

    const loadingTimeout = setTimeout(() => {
      dispatch({ type: 'stopLoading' });
    }, 150);

    return () => {
      clearInterval(intervalID);
      clearTimeout(loadingTimeout);
    };
  }, []);

  function handleDarkMode() {
    dispatch({ type: 'onDarkMode' });
  }
  function createdItem(newItem) {
    dispatch({ type: 'item/created', payload: newItem });
    setMyDailyTodoList([newItem, ...myDailyTodoList]);
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
  function deletedItem(id) {
    setMyDailyTodoList((myDailyTodoList) =>
      myDailyTodoList.filter((todoItem) => todoItem.id !== id)
    );
    notify('success', 'Task deleted');
  }
  function sortedItems(option) {
    dispatch({ type: 'startLoading' });
    setTimeout(() => {
      dispatch({ type: 'items/sort', payload: option });
      dispatch({ type: 'stopLoading' });
    }, 150);
  }
  function deletedAllItems() {
    dispatch({ type: 'items/deleted' });
    setMyDailyTodoList([]);
    notify('success', 'All task deleted');
  }

  function notify(type, message) {
    toast[type](message, {
      position: toast.POSITION.TOP_CENTER,
    });
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
        deletedItem,
        countCompletedTodoItem,
        sortedItems,
        sortingOptions,
        deletedAllItems,
        notify,
        isLoading,
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
