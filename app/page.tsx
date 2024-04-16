'use client';

import { useState } from 'react';
import { LISTOFTODO, TItemTodo } from '@/config/listOfTodo';
import { STATUSES } from '@/config/status';
import FilterTodo from '@/components/filter-todo';
import TodoList from '@/components/todo-list';

const IndexPage = () => {
  const [filterStatus, setFilterStatus] = useState(STATUSES[0]);
  const [listOfTodo, setListOfTodo] = useState<TItemTodo[]>(LISTOFTODO);
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <>
      <article className="w-full relative">
        <FilterTodo
          setFilterStatus={setFilterStatus}
          filterStatus={filterStatus}
          inputValue={inputValue}
          listOfTodo={listOfTodo}
          setListOfTodo={setListOfTodo}
          setInputValue={setInputValue}
        />
        <TodoList
          listOfTodo={listOfTodo}
          setListOfTodo={setListOfTodo}
          filterStatus={filterStatus}
          inputValue={inputValue}
        />
      </article>
    </>
  );
};

export default IndexPage;
