import { Dispatch, SetStateAction, useMemo } from 'react';
import { ArchiveX } from 'lucide-react';
import { TItemTodo } from '@/config/listOfTodo';
import { TStatus } from '@/config/status';
import TodoItem from '../todo-item';

type TTodoListProps = {
  listOfTodo: TItemTodo[];
  filterStatus: TStatus | undefined;
  setListOfTodo: Dispatch<SetStateAction<TItemTodo[]>>;
  inputValue: string;
};

const TodoList = ({
  listOfTodo,
  filterStatus,
  setListOfTodo,
  inputValue,
}: TTodoListProps) => {
  const filteredTodo = useMemo(() => {
    const selectedStatus = listOfTodo.filter(
      (item) =>
        filterStatus?.value !== 'all' && item.status === filterStatus?.value
    );
    if (filterStatus && filterStatus.value !== 'all' && !inputValue) {
      if (filterStatus.value === 'all') {
        return listOfTodo;
      }
      return listOfTodo.filter((item) => item.status === filterStatus.value);
    }
    if (inputValue) {
      const searchValue = inputValue.toLowerCase();
      if (selectedStatus.length !== 0) {
        return selectedStatus.filter(
          (item) =>
            item.title.toLowerCase().includes(searchValue) ||
            item.status === filterStatus?.value
        );
      }
      return listOfTodo.filter(
        (item) =>
          item.title.toLowerCase().includes(searchValue) ||
          item.status === filterStatus?.value
      );
    }

    return listOfTodo;
  }, [filterStatus, inputValue, listOfTodo]);
  return (
    <section>
      {listOfTodo.length === 0 ? (
        <section className="flex flex-col items-center h-[800px] justify-center ">
          <ArchiveX className="size-32  text-[#cdcdcd]" />
          <h1 className="size-8 w-fit uppercase text-[#939393] font-medium">
            Your list is empty
          </h1>
        </section>
      ) : (
        <section>
          {filteredTodo &&
            filteredTodo.map((itemTodo) => (
              <TodoItem
                key={itemTodo.id}
                item={itemTodo}
                setListOfTodo={setListOfTodo}
              />
            ))}
        </section>
      )}
    </section>
  );
};

export default TodoList;
