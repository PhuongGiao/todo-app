import { Dispatch, SetStateAction } from 'react';
import { TItemTodo } from '@/config/listOfTodo';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export type TDetailedTodo = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedItem: TItemTodo;
};

const DetailedTodo = ({ open, setOpen, selectedItem }: TDetailedTodo) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[400px] rounded-md gap-4">
        <DialogHeader>
          <DialogTitle className="flex text-base font-bold">
            Todo Detail
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col	">
          <label className="text-sm font-medium text-title">Todo</label>
          <label className="text-sm font-normal text-description">
            {selectedItem?.title}
          </label>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default DetailedTodo;
