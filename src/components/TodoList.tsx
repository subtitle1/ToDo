import { useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { toDoState } from "../atoms";
import ToDo from "./ToDo";
import styled from "styled-components";

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
  /* margin: -6.7em 2.2em; */
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

const ToDoContent = styled.div`
  height: 20em;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const ToDoItems = styled.div`
  /* background: #f3f7f8; */
  height: 4.5em;
  width: 100%;
  padding: 20px;
  /* opacity: 0; */
  vertical-align: middle;
  /* border-bottom: 1px solid #eee; */
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

const BtnContainer = styled.div``;

function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <Container>
        <ToDoContainer>
          <ToDoHeader>
            <h1>ToDos</h1>
          </ToDoHeader>
          <ToDoContent>
            <ToDoItems>
              <ul>
                {toDos.map((toDo) => (
                  <ToDo key={toDo.id} {...toDo} />
                ))}
              </ul>
            </ToDoItems>
          </ToDoContent>
          <BtnContainer></BtnContainer>
          <ToDoFooter></ToDoFooter>
          <CreateToDo />
        </ToDoContainer>
      </Container>
    </div>
  );
}

export default ToDoList;
