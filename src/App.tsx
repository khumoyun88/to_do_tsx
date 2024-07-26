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
    <div className="App">
      <h1>To-Do App</h1>
      <div>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button
          style={{
            fontWeight: "bold",
            color: "#000"
          }}
          disabled={text === ""}
          onClick={addNewTodo}
        >
          +
        </button>
      </div>
      <div>
        <h1>Tasks to do - {todos.length > 0 ? todos.length : "Empty"}</h1>
        <ul>
          {todos
            .filter((t) => !t.done)
            .map((t) => (
              <li key={t.id}>
                <span>{t.title}</span>
                <div>
                  <img
                    src="./src/assets/tickBtn.svg"
                    alt="tickButton"
                    onClick={() => dispatch({ type: "TOGGLE_DONE_TODO", payload: t.id })}
                  />
                  <img
                    src="./src/assets/deleteBtn.svg"
                    alt="delButton"
                    onClick={() => dispatch({ type: "DELETE_TODO", payload: t.id })}
                  />
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h1>Completed Tasks: </h1>
        <ul>
          {doneTodos.map((t) => (
            <li key={t.id}>
              <span
                style={{
                  color: "#228b22",
                  textDecorationLine: "line-through"
                }}
              >
                {t.title}
              </span>
              <button onClick={() => dispatch({ type: "TOGGLE_DONE_TODO", payload: t.id })}>
                Undo
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
