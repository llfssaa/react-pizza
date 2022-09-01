export interface Item {
  id: number
  imageUrl: string,
  name: string,
  types: Array<number>,
  sizes: Array<number>
  price: number,
  itemCount: number,

}

export type Items = Array<Item>