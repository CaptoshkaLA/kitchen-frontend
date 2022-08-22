export interface Dish {
  id?: number;
  name: string;
  category: string;
  description: string;
  menu_type: string;
  price: number;
  pfc?: string;
  note?: string;
  image?: string;
}
