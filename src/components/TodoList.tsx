import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector } from "../atoms";
import ToDo from "./ToDo";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCheck,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  perspective: 1200;
`;

const ToDoContainer = styled.div`
  background: #fff;
  width: 22em;
  box-shadow: 1px 0px 25px #cddbe1;
  border-radius: 3px;
`;

const ToDoHeader = styled.header`
  background: #3a405a;
  padding: 1em;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  h1 {
    color: #faf9f9;
    text-align: center;
    font-size: 50px;
  }
`;

const ToDoCategory = styled.h2`
  text-align: center;
  font-weight: bold;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 25px 0px;
  gap: 10px;
  color: rgb(238, 156, 167);
`;

const Tab = styled.a`
  text-align: center;
  padding: 7px 0px;
  cursor: pointer;
  &:hover {
    color: rgb(223, 102, 118);
    font-size: 15px;
  }
`;

const ToDoContent = styled.div`
  height: 20em;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #dfdfdf;
  }
`;

const ToDoItems = styled.div`
  height: 4.5em;
  width: 100%;
  padding: 15px;
  vertical-align: middle;

  p {
    color: #707aa3;
    font-size: 0.75em;
    letter-spacing: 0.015em;
    float: left;
    width: 17em;
    font-weight: 400;
    margin: 0 auto;
    text-transform: capitalize;
  }
`;

const ToDoFooter = styled.div`
  border-top: 1px solid #eee;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    setCategory(event.currentTarget.dataset.category as any);
  };

  return (
    <div>
      <Container>
        <ToDoContainer>
          <ToDoHeader>
            <h1>ToDos</h1>
          </ToDoHeader>
          <ToDoContent>
            <ToDoItems>
              <Tabs>
                <Tab data-category={Categories.TO_DO} onClick={onClick}>
                  <FontAwesomeIcon icon={faBars} size="2x" />
                </Tab>
                <Tab data-category={Categories.DOING} onClick={onClick}>
                  <FontAwesomeIcon icon={faBriefcase} size="2x" />
                </Tab>
                <Tab data-category={Categories.DONE} onClick={onClick}>
                  <FontAwesomeIcon icon={faCheck} size="2x" />
                </Tab>
              </Tabs>
              <ToDoCategory>{category}</ToDoCategory>
              <ul>
                {toDos.map((toDo) => (
                  <ToDo key={toDo.id} {...toDo} />
                ))}
              </ul>
            </ToDoItems>
          </ToDoContent>
          <ToDoFooter></ToDoFooter>
          <CreateToDo />
        </ToDoContainer>
      </Container>
    </div>
  );
}

export default ToDoList;
