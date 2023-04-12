import axios from "axios";
import { useState } from "react";

function CreatToDo({ getToDoList }) {
  const [title, setTitle] = useState("");

  const onSubmitCreateTodo = async (e) => {
    try {
      e.preventDefault();

      if (!title) {
        alert("타이틀을 입력해주세요!");
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/todo`,
        {
          title,
          desc: `${title} 아자아자 화이팅!`,
        }
      );
      console.log(response);
      getToDoList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex mt-2" onSubmit={onSubmitCreateTodo}>
      <input
        className="grow border-2 border-pink-200 rounded-md focus:outline-pink-400 px-2 py-1 text-lg text-black"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="ml-4 px-2 py-1 bg-pink-200 hover:bg-pink-400 rounded-md text-gray-50"
        type="submit"
        value="새 투두 생성"
      />
    </form>
  );
}

export default CreatToDo;
