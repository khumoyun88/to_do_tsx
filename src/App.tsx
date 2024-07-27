import "./App.css";
import React, { useReducer, useState } from "react";

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "TOGGLE_DONE_TODO"; payload: number };

const init: Todo[] = [
  {
    id: 1,
    title: "Buy groceries",
    done: false,
  },
  {
    id: 2,
    title: "Walk the dog",
    done: true,
  },
  {
    id: 3,
    title: "Complete homework",
    done: false,
  },
  {
    id: 4,
    title: "Read a book",
    done: true,
  },
];

const reducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: Date.now(), title: action.payload, done: false }];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "TOGGLE_DONE_TODO":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [todos, dispatch] = useReducer(reducer, init);
  const [text, setText] = useState("");

  const addNewTodo = () => {
    dispatch({ type: "ADD_TODO", payload: text });
    setText("");
  };

  const doneTodos = todos.filter((todo) => todo.done);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-800">
      <div className="w-[583px] h-[658px] rounded-xl bg-gray-900 m-10 p-10 flex flex-col justify-around items-start">
       
        <h1 className="text-white text-xl font-normal m-4">To-Do App</h1>
        <div className="flex mb-10">
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="w-96 h-10 border-2 border-purple-400 rounded-xl bg-gray-800 text-gray-400 p-4 outline-none"
          />
          <button
            className="w-10 h-10 rounded-xl bg-purple-400 border-none cursor-pointer text-lg text-white ml-2"
            disabled={text === ""}
            onClick={addNewTodo}
          >
            +
          </button>
        </div>
        <div>

          <h1 className="text-white text-lg font-normal m-4">
            Tasks to do - {todos.length > 0 ? todos.length : "Empty"}
          </h1>
          <ul>
            {todos
              .filter((t) => !t.done)
              .map((t) => (
                <li
                  key={t.id}
                  className="w-96 flex justify-between items-center list-none text-purple-400 my-4 p-4 rounded-xl bg-gray-800"
                >
                  <span className="text-base">{t.title}</span>
                  <div className="flex space-x-2">
                    <img
                      src="./src/assets/tickBtn.svg"
                      alt="tickButton"
                      onClick={() =>
                        dispatch({ type: "TOGGLE_DONE_TODO", payload: t.id })
                      }
                      className="cursor-pointer w-6 h-6"
                    />
                    <img
                      src="./src/assets/deleteBtn.svg"
                      alt="delButton"
                      onClick={() =>
                        dispatch({ type: "DELETE_TODO", payload: t.id })
                      }
                      className="cursor-pointer w-6 h-6"
                    />
                  </div>
                </li>
              ))}
          </ul>

        </div>
        <div>

          <h1 className="text-white text-lg font-normal m-4">Completed Tasks: </h1>
          <ul>
            {doneTodos.map((t) => (
              <li
                key={t.id}
                className="w-96  flex justify-between items-center list-none text-purple-400 my-4 p-3 rounded-xl bg-gray-800"
              >
                <span className="text-green-600 line-through text-base">
                  {t.title}
                </span>
                <button
                  className="rounded-xl bg-purple-400 border-none cursor-pointer text-sm text-white px-4 py-1 ml-3"
                  onClick={() => dispatch({ type: "TOGGLE_DONE_TODO", payload: t.id })}
                >
                  Undo
                </button>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
};

export default App;
