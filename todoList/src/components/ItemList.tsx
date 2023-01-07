import { useState } from 'react';

import { Trash } from 'phosphor-react';
import styles from './ItemList.module.css';

export interface Task {
    id: string;
    text: string;
    done: boolean;
    deleteTask: Function;
    selectTask: Function;
}

export function ItemList({ id, text, done , deleteTask, selectTask }: Task) {

    function handleCheck(){
        selectTask(id, done);
    }

    return (

        <div className={styles.withTaskContainer}>
            <div className={styles.taskContent}>
                <input
                    type="checkbox"
                    onClick={handleCheck}
                    className={styles.checkbox}
                />
                <div 
                    className={!done ? styles.text : styles.textSelected }
                >
                    {text}
                </div>
            </div>
            <Trash 
                size={24} 
                onClick={()=>deleteTask(id)}
                className={styles.trash} 
                alt="Excluir Tarefa"
            />
        </div>

    );
}