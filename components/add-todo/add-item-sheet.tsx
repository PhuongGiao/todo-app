import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';
import { TItemTodo } from '@/config/listOfTodo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export type TAddItemSheet = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setListOfTodo: Dispatch<SetStateAction<TItemTodo[]>>;
  listOfTodo: TItemTodo[];
};

const AddItemSheet = ({
  open,
  setOpen,
  setListOfTodo,
  listOfTodo,
}: TAddItemSheet) => {
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Todo</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-start gap-4 flex-col">
            <Label htmlFor="name" className="text-right">
              Todo
            </Label>
            <Input
              id="name"
              defaultValue="placeholder"
              className="col-span-3"
              onChange={handleNewTitle}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={() => addItemToList()}
              className="w-full"
              type="submit"
            >
              Add
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddItemSheet;
