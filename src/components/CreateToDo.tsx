import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";

interface IForm {
  toDo: string;
}

const ToDoForm = styled.div`
  padding: 40px;
  justify-content: center;
  display: flex;
  input {
    border: none;
    outline: 0;
    -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    height: 34px;
    background: #e8ebed;
    border: 2px solid #e8ebed;
    transition: background 0.25s ease-out;
  }
`;

const Form = styled.form`
  justify-content: center;
  display: flex;
  align-items: center;
`;

const AddBtn = styled.button`
  border: none;
  width: 35px;
  height: 35px;
  margin-left: 5px;
  font-size: 20px;
  border: none;

  cursor: pointer;
  font-weight: bold;
  color: #fff;
  background: #ee9ca7;
  border-radius: 10px;
  transition: 250ms ease-out;

  &:hover {
    background: #3a405a;
  }
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  // handleSubmit은 useForm을 통해 가져온 함수
  // handleSubmit을 사용할 때는 첫번째 매개변수로 데이터가 유효할 때 호출되는 다른 함수를 받는 것
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <ToDoForm>
      <Form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder=" write a to do"
        />
        <AddBtn>+</AddBtn>
      </Form>
    </ToDoForm>
  );
}

export default CreateToDo;
