import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';
import { TItemTodo } from '@/config/listOfTodo';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export type TDeleteTodo = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setListOfTodo: Dispatch<SetStateAction<TItemTodo[]>>;
  selectedItem: TItemTodo;
};

const DeleteTodo = ({
  open,
  setOpen,
  setListOfTodo,
  selectedItem,
}: TDeleteTodo) => {
  const deleteItem = () => {
    setListOfTodo((listOfTodo) => {
      const dataArray: TItemTodo[] | undefined = listOfTodo;
      const updatedDataArray = dataArray.filter(
        (item: TItemTodo) => item.id !== selectedItem?.id
      );
      return updatedDataArray;
    });
    toast.success('Delete: Todo was successfully deleted! ');
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[400px] rounded-md p-6">
        <DialogHeader>
          <DialogTitle className="flex text-base font-bold">
            Delete Todo
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm font-normal text-title">
          Are you sure?
          <br /> This action can not be undone.
        </DialogDescription>

        <DialogFooter>
          <div className="flex justify-end h-full w-full">
            <DialogClose asChild>
              <button
                onClick={() => deleteItem()}
                className="text-sm font-medium bg-red-400 text-white w-full text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Delete
              </button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTodo;
