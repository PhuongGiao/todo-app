import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';
import { TItemTodo } from '@/config/listOfTodo';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export type TAddItemDialog = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setListOfTodo: Dispatch<SetStateAction<TItemTodo[]>>;
  listOfTodo: TItemTodo[];
};

const AddItemDialog = ({
  open,
  setOpen,
  setListOfTodo,
  listOfTodo,
}: TAddItemDialog) => {
  const [newTitle, setNewTitle] = useState<string>('');

  const handleNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const addItemToList = () => {
    const newItem: TItemTodo = {
      id: listOfTodo.length + 1,
      title: newTitle,
      status: 'todo',
    };
    setListOfTodo([...listOfTodo, newItem]);
    toast.success('Add: New Todo was successfully added!');
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[400px] rounded-md p-6">
        <DialogHeader>
          <DialogTitle className="flex text-base font-bold">
            Add Todo
          </DialogTitle>
        </DialogHeader>
        <fieldset className="items-center gap-5">
          <label
            className="text-violet11 w-[90px] text-right text-[15px] text-sm"
            htmlFor="name"
          >
            Todo
          </label>
          <input
            onChange={handleNewTitle}
            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            id="name"
            defaultValue="placeholder"
          />
        </fieldset>

        <DialogFooter>
          <div className="flex justify-end h-full">
            <DialogClose asChild>
              <button
                type="submit"
                onClick={() => addItemToList()}
                className="bg-black text-white text-sm w-full text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Add
              </button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
