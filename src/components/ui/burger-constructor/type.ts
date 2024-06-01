import { TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  isModalOpen: boolean;
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
