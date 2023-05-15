import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";
import { IToDo } from "../atoms";
import React from "react";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name };

      return (
        [...oldToDos].slice(0, targetIdx),
        newToDo,
        [...oldToDos].slice(targetIdx + 1)
      );
    });
  };

  return (
    <li>
      <p>{text}</p>
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
      <div></div>
    </li>
  );
}

export default ToDo;
