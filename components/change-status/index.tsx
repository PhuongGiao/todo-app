import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';
import { TItemTodo } from '@/config/listOfTodo';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export type TChangeStatus = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setListOfTodo: Dispatch<SetStateAction<TItemTodo[]>>;
  selectedItem: TItemTodo;
};

const ChangeStatus = ({
  open,
  setOpen,
  setListOfTodo,
  selectedItem,
}: TChangeStatus) => {
  const handleChangeStatus = () => {
    setListOfTodo((listOfTodo) => {
      const updatedList: TItemTodo[] | undefined = listOfTodo;
      const indexToUpdate: number = updatedList.findIndex(
        (item: TItemTodo) => item.id === selectedItem?.id
      );
      if (indexToUpdate !== -1) {
        updatedList[indexToUpdate]?.status === 'todo'
          ? ((updatedList[indexToUpdate] as TItemTodo).status = 'done')
          : ((updatedList[indexToUpdate] as TItemTodo).status = 'todo');
      }
      return updatedList;
    });
    toast.success('Change: Todo status was successfully changed! ');
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to change the status of this item{' '}
            <b className="text-red-400">{selectedItem?.title}</b> to{' '}
            <b className="text-red-400">
              {selectedItem.status === 'todo' ? 'Done' : 'todo'}
            </b>{' '}
            ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleChangeStatus()}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangeStatus;
