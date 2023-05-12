import { useState } from "react";
import { useForm } from "react-hook-form";

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;


    setToDo(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          value={toDo}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
    </div>
  );
} */

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };

  console.log(formState.errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("email", { required: true })} placeholder="Email" />
        <input
          {...register("username", { required: true, minLength: 5 })}
          placeholder="user name"
        />
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short",
            },
          })}
          placeholder="Password"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
