import React, { Dispatch, SetStateAction } from 'react';
import { EModal, type TModalProps } from '@/contexts/modal-context';
import { SquarePen, Trash2 } from 'lucide-react';
import { type TItemTodo } from '@/config/listOfTodo';
import { cn } from '@/lib/utils';
import useModal from '@/hooks/useModal';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

type TTodoItemProps = {
  item: TItemTodo;
  setListOfTodo: Dispatch<SetStateAction<TItemTodo[]>>;
};

type THandleClickProps = {
  type: EModal;
  props?: TModalProps | undefined;
};

const TodoItem = ({ item, setListOfTodo }: TTodoItemProps) => {
  const { onOpen } = useModal();
  const handleClick = ({ type, props }: THandleClickProps) => {
    onOpen({ type, props });
  };

  const openEditSheet = () => {
    handleClick({
      type: EModal.EDIT_SHEET,
      props: {
        setListOfTodo,
        selectedItem: item,
      },
    });
  };

  const openEditDialog = () => {
    handleClick({
      type: EModal.EDIT_DIALOG,
      props: {
        setListOfTodo,
        selectedItem: item,
      },
    });
  };

  const deleteItem = () => {
    handleClick({
      type: EModal.DELETE_ITEM,
      props: {
        setListOfTodo,
        selectedItem: item,
      },
    });
  };

  const changeStatusItem = () => {
    handleClick({
      type: EModal.CHANGE_STATUS,
      props: {
        setListOfTodo,
        selectedItem: item,
      },
    });
  };

  const detailItem = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleClick({
      type: EModal.DETAIL_INF,
      props: {
        selectedItem: item,
      },
    });
  };
  return (
    <article
      className={cn(
        'flex border-[1px] border-light rounded-lg p-4 justify-between m-4',
        item.status === 'done' && 'bg-[#D9D9D9]'
      )}
    >
      <section className="flex items-center">
        <Checkbox
          onClick={changeStatusItem}
          id="todoItem"
          checked={item.status === 'done'}
        />
        <label
          onClick={detailItem}
          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#71717A] px-2"
        >
          {item?.title}
        </label>
      </section>

      <section className="flex space-x-4 items-center">
        <section>
          <section className="block lg:hidden">
            <Button variant={'ghost'} onClick={openEditDialog}>
              <SquarePen className="w-full space-x-2 text-base text-title stroke-[1px]" />
            </Button>
          </section>
          <section className="hidden lg:block">
            <Button variant={'ghost'} onClick={openEditSheet}>
              <SquarePen className="w-full space-x-2 text-base text-title stroke-[1px]" />
            </Button>
          </section>
        </section>

        <Button variant={'ghost'} onClick={deleteItem}>
          <Trash2 className="w-full text-[#F41515] space-x-2 text-base stroke-[1px] " />
        </Button>
      </section>
    </article>
  );
};

export default TodoItem;
