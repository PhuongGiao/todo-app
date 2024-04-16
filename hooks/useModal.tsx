import { useContext } from 'react';
import { ModalContext } from '@/contexts/modal-context';

const useModal = () => {
  return useContext(ModalContext);
};
export default useModal;
