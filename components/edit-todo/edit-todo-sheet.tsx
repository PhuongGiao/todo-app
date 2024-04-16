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

export type TEditTodoSheetProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setListOfTodo: Dispatch<SetStateAction<TItemTodo[]>>;
  selectedItem: TItemTodo;
};

const EditTodoSheet = ({
  open,
  setOpen,
  setListOfTodo,
  selectedItem,
}: TEditTodoSheetProps) => {
  const [editedTitle, setEditedTitle] = useState('');
  const handleEditItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const editItem = () => {
    setListOfTodo((listOfTodo) => {
      const updatedList: TItemTodo[] | undefined = listOfTodo;
      const indexToUpdate: number = updatedList.findIndex(
        (itemOfList: TItemTodo) => itemOfList.id === selectedItem?.id
      );
      if (indexToUpdate !== -1) {
        (updatedList[indexToUpdate] as TItemTodo).title = editedTitle;
      }
      return updatedList;
    });
    toast.success('Edit: Todo was successfully edited!');
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Todo</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-start gap-4 flex-col">
            <Label htmlFor="name" className="text-right">
              Todo
            </Label>
            <Input
              onChange={handleEditItem}
              id="name"
              defaultValue={selectedItem?.title}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={() => editItem()} className="w-full" type="submit">
              Update
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditTodoSheet;
