export interface Item {
  id: number
  imageUrl: string,
  name: string,
  types: Array<number>,
  sizes: Array<number>
  price: number,

}

export type Items = Array<Item>