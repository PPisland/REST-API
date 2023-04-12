import axios from "axios";
import TodoCard from "./components/TodoCard";
import { useEffect, useState } from "react";
import CreatToDo from "./components/CreateToDo";

function App() {
  const [todoList, setTodoList] = useState();

  const getToDoList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/todo`
      );

      if (response.status !== 200) {
        alert("요청을 불러오지 못했습니다.");
        return;
      }

      setTodoList(response.data);

      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getToDoList();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-start items-center pt-16">
      <h1 className="text-4xl font-bold">AWESOME TO DO LIST 👀</h1>
      <div>
        <div className="mt-8 text-sm font-semibold">
          The two most important days in your life are the day you are born and
          the day you find out why. - Mark Twain
        </div>
        <div className="text-xs">
          인생의 가장 중요한 시기를 뽑자면, 하루는 당신이 태어난 날이고, 또 다른
          하루는 당신이 왜 태어났는지 깨닫는 날이다. - 마크 트웨인
        </div>
        <CreatToDo getToDoList={getToDoList} />
        <ul className="mt-16 flex flex-col w-1/2">
          {todoList &&
            todoList.map((v, i) => {
              return (
                <TodoCard
                  key={i}
                  title={v.title}
                  isDone={v.isDone}
                  index={i}
                  getToDoList={getToDoList}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default App;
