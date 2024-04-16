'use client';

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
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export type TEditTodoDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setListOfTodo: Dispatch<SetStateAction<TItemTodo[]>>;
  selectedItem: TItemTodo;
};

const EditTodoDialog = ({
  open,
  setOpen,
  setListOfTodo,
  selectedItem,
}: TEditTodoDialogProps) => {
  const [editedTitle, setEditedTitle] = useState('');
  const handleEditItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const editItem = () => {
    setListOfTodo((listOfTodo) => {
      const updatedList: TItemTodo[] | undefined = listOfTodo;
      const indexToUpdate: number = updatedList.findIndex(
        (item: TItemTodo) => item.id === selectedItem?.id
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[400px] rounded-md p-6">
        <DialogHeader>
          <DialogTitle className="flex">Edit Todo</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            onChange={handleEditItem}
            id="name"
            defaultValue={selectedItem?.title}
            className="col-span-3"
          />
        </div>

        <DialogFooter>
          <div className="flex justify-end h-full">
            <DialogClose asChild>
              <Button onClick={() => editItem()} type="submit">
                Update
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoDialog;
