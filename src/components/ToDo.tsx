import { useSetRecoilState } from "recoil";
import { Categories, toDoState } from "../atoms";
import { IToDo } from "../atoms";
import React from "react";
import styled from "styled-components";

const Li = styled.li`
  margin: 10px 0px 10px 0px;
`;
const ToDoContent = styled.span`
  font-size: 15px;
  font-weight: normal;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 10px 0px 10px 0px;
  gap: 10px;
`;

const Buttons = styled.button`
  font-size: 10px;
  box-sizing: border-box;
  appearance: none;
  background-color: transparent;
  border: 2px solid rgb(58, 64, 90);
  border-radius: 0.6em;
  cursor: pointer;
  display: flex;
  align-self: center;
  padding: 8px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  color: rgb(112, 122, 163);
  background-image: linear-gradient(
    45deg,
    rgb(58, 64, 90) 50%,
    transparent 50%
  );
  background-position: 100% center;
  background-size: 400%;
  transition: background 300ms ease-in-out 0s;

  &:hover,
  focus {
    color: #fff;
    outline: 0;
  }

  &:hover {
    background-position: 0;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };

      return [
        ...oldToDos.slice(0, targetIdx),
        newToDo,
        ...oldToDos.slice(targetIdx + 1),
      ];
    });
  };

  return (
    <Li>
      <ToDoContent>{text}</ToDoContent>
      <Tabs>
        {category !== Categories.DOING && (
          <Buttons name={Categories.DOING} onClick={onClick}>
            Doing
          </Buttons>
        )}
        {category !== Categories.TO_DO && (
          <Buttons name={Categories.TO_DO} onClick={onClick}>
            To Do
          </Buttons>
        )}
        {category !== Categories.DONE && (
          <Buttons name={Categories.DONE} onClick={onClick}>
            Done
          </Buttons>
        )}
      </Tabs>
      <hr />
    </Li>
  );
}

export default ToDo;
