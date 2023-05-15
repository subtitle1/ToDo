import { IToDo } from "../atoms";

function ToDo({ text }: IToDo) {
  return (
    <li>
      <p>{text}</p>
      <div>
        <button>Doing</button>
        <button>To Do</button>
        <button>Done</button>
      </div>
    </li>
  );
}

export default ToDo;
