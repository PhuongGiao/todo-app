'use client';

import { ComponentType, ReactNode, createContext, useState } from 'react';
import AddItemDialog, {
  TAddItemDialog,
} from '@/components/add-todo/add-item-dialog';
import AddItemSheet, {
  TAddItemSheet,
} from '@/components/add-todo/add-item-sheet';
import ChangeStatus, { TChangeStatus } from '@/components/change-status';
import DeleteTodo, { TDeleteTodo } from '@/components/delete-todo';
import DetailedTodo, { TDetailedTodo } from '@/components/detail-todo';
import EditTodoDialog, {
  TEditTodoDialogProps,
} from '@/components/edit-todo/edit-todo-dialog';
import EditTodoSheet, {
  TEditTodoSheetProps,
} from '@/components/edit-todo/edit-todo-sheet';

type TModalProvider = {
  children: ReactNode;
};

type TModalContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onOpen: ({ type }: TOnOpen) => void;
};

export enum EModal {
  EDIT_DIALOG = 'editDialog',
  EDIT_SHEET = 'editSheet',
  ADD_DIALOG = 'addDialog',
  ADD_SHEET = 'addSheet',
  DELETE_ITEM = 'deleteItem',
  DETAIL_INF = 'detailInf',
  CHANGE_STATUS = 'changeStatus',
}

export type TModalType =
  | 'editDialog'
  | 'editSheet'
  | 'addDialog'
  | 'addSheet'
  | 'deleteItem'
  | 'detailInf'
  | 'changeStatus';

export type TModalProps = Omit<
  | TEditTodoDialogProps
  | TEditTodoSheetProps
  | TAddItemDialog
  | TAddItemSheet
  | TDeleteTodo
  | TDetailedTodo
  | TChangeStatus,
  'open' | 'setOpen'
>;

type TOnOpen = {
  type: EModal;
  props?: TModalProps | undefined;
};

export const ModalContext = createContext<TModalContext>({
  open: false,
  setOpen: () => undefined,
  onOpen: () => undefined,
});

const ModalProvider = ({ children }: TModalProvider) => {
  const [modalProps, setModalProps] = useState<TModalProps | undefined>();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<EModal>(EModal.EDIT_DIALOG);

  const onOpen = ({ type, props }: TOnOpen) => {
    setOpen(true);
    setModalType(type);
    setModalProps(props);
  };

  const modalsMap: Record<EModal, ComponentType<any>> = {
    [EModal.EDIT_DIALOG]: EditTodoDialog,
    [EModal.EDIT_SHEET]: EditTodoSheet,
    [EModal.ADD_DIALOG]: AddItemDialog,
    [EModal.ADD_SHEET]: AddItemSheet,
    [EModal.DELETE_ITEM]: DeleteTodo,
    [EModal.DETAIL_INF]: DetailedTodo,
    [EModal.CHANGE_STATUS]: ChangeStatus,
  };
  const Modal = modalsMap[modalType];
  return (
    <ModalContext.Provider
      value={{
        open,
        setOpen,
        onOpen,
      }}
    >
      {children}
      <Modal open={open} setOpen={setOpen} {...modalProps} />
    </ModalContext.Provider>
  );
};

export default ModalProvider;
