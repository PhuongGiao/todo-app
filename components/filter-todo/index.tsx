import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { EModal } from '@/contexts/modal-context';
import { CircleFadingPlus, X } from 'lucide-react';
import { TItemTodo } from '@/config/listOfTodo';
import { STATUSES, TStatus } from '@/config/status';
import { cn } from '@/lib/utils';
import useModal from '@/hooks/useModal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type TFilterTodoProps = {
  setFilterStatus: Dispatch<SetStateAction<TStatus | undefined>>;
  filterStatus: TStatus | undefined;
  listOfTodo: TItemTodo[];
  setListOfTodo: Dispatch<SetStateAction<TItemTodo[]>>;
  setInputValue: Dispatch<SetStateAction<string>>;
  inputValue: string;
};

const FilterTodo = ({
  setFilterStatus,
  listOfTodo,
  setListOfTodo,
  setInputValue,
  filterStatus,
  inputValue,
}: TFilterTodoProps) => {
  const { onOpen } = useModal();

  const handleChange = (selected: string) => {
    setFilterStatus(STATUSES.find((tus) => tus.value === selected));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const needToClear = useMemo(() => {
    if (filterStatus?.value !== 'all' || inputValue) {
      return true;
    }
    return false;
  }, [filterStatus, inputValue]);

  return (
    <section className="flex p-4 pb-0 gap-2 justify-between">
      <section className="flex w-[90%] gap-2">
        <Input
          onChange={handleChangeInput}
          placeholder="Searching..."
          className="sm:w-full lg:w-1/4"
        />
        <Select onValueChange={handleChange} defaultValue="all">
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {STATUSES.map((status) => (
                <SelectItem key={status.id} value={status.value}>
                  {status.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant="ghost" className={cn('hidden', needToClear && 'flex')}>
          <p className="font-medium text-sm pr-2">Clear</p>
          <X className="w-4 h-4" />
        </Button>
      </section>

      {/* <section className="flex justify-center items-center"> */}
      <section className="block lg:hidden">
        <Button
          onClick={() =>
            onOpen({
              type: EModal.ADD_DIALOG,
              props: {
                listOfTodo: listOfTodo,
                setListOfTodo,
              },
            })
          }
        >
          <CircleFadingPlus /> Add
        </Button>
      </section>
      <section className="hidden lg:block">
        <Button
          onClick={() =>
            onOpen({
              type: EModal.ADD_SHEET,
              props: {
                listOfTodo: listOfTodo,
                setListOfTodo,
              },
            })
          }
        >
          <CircleFadingPlus /> Add
        </Button>
      </section>
      {/* </section> */}
    </section>
  );
};

export default FilterTodo;
