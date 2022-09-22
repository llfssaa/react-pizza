export enum LS {
  Cart = 'cart',
  State = 'state',
  TotalItems = 'totalItems',
  TotalPrice = 'totalPrice',
  TotalPizzas = 'totalPizzas'
}

export interface Item {
  id: number
  imageUrl: string,
  name: string,
  types: Array<number>,
  sizes: Array<number>
  price: number,
  itemCount: number,
  type: string,
  size: number

}

export type SearchPizzaParams = {
  sortBy: string;
  category: number;
  search: string;
  page: number;
};

export type Items = Array<Item>