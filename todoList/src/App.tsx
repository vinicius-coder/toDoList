import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './global.css';
import { PlusCircle } from "phosphor-react";

import { Header } from './components/Header';
import { ItemList } from './components/ItemList';

import styles from './App.module.css';

interface Task {
  id: string;
  text: string;
  done: boolean;
}

export function App() {

  const [toDoList, setToDoList] = useState<Task[]>([]);

  const [taskName, setTaskName] = useState("");
  const [totalTasks, setTotalTasks] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    let newTask = {
      id: uuidv4(),
      text: taskName,
      done: false
    }
    
    if(toDoList.length)
      setToDoList([...toDoList, newTask]);
    else
      setToDoList([newTask]);

    setTotalTasks(totalTasks+1);
    setTaskName("");
  }

  function handleChangeText(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setTaskName(event.target.value);
  }

  function selectTask(id: string){
    
    const list = toDoList.map(item=>{
      if (item.id==id && item.done==false){
        item.done = true;
        setDoneTasks(doneTasks+1);
      } else if(item.id==id) {
        item.done = false;
        setDoneTasks(doneTasks-1);
      }
      return item;
    })
    setToDoList(list);

  }

  function deleteTask(id: string, done: boolean) {

    //Remove item da lista e atualiza estado
    const newList = toDoList.filter(item => item.id !== id);
    setToDoList(newList);
    setTotalTasks(totalTasks-1);

    const count = newList.filter(item=>item.done==true).length;
    setDoneTasks(count);
    
  }

  return (
    <div>
      <Header />

      <main>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="task-name"
            value={taskName}
            onChange={handleChangeText}
            placeholder="Adicione uma nova tarefa"
            className={styles.taskName}
            minLength={3}
            autoComplete="off"
            required
          />
          <button
            className={styles.taskButton}
            type="submit"
          >
            Criar
            <PlusCircle size={23} className={styles.plusIcon} />
          </button>
        </form>

        <div className={styles.listContainer}>
          <div className={styles.listHeader}>
            <div className={styles.listTotalTask}>
              Tarefas Criadas
              <span className={styles.total}>
                {totalTasks}
              </span>
            </div>
            <div className={styles.listDoneTask}>
              Concluídas
              <span className={styles.total}>
                {doneTasks} de {totalTasks}
              </span>
            </div>
          </div>

          <div className={styles.taskListContainer}>

            {toDoList.map(item => {
              return (
                <ItemList
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  done={item.done}
                  selectTask={selectTask}
                  deleteTask={deleteTask}
                />
              )
            })}

          </div>

        </div>
      </main>

    </div>
  )
}