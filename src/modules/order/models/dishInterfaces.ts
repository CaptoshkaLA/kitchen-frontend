export interface DailyMenu {
  date: string;
  menu: Array<DishType>;
}

export interface DishType {
  typeName: string;
  textColor: string;
  dishes: Array<Dish>;
}

export interface Dish {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  pfc: string;
}

export interface Order {
  userId: number;
  lunchDate: string;
  orderDate: string;
  updateDate: string;
  orderPrice: number;
  orderedDishes: Array<OrderedDish>;
}

export interface OrderedDish {
  dishId: number;
  dishTypeName: string;
  orderedDishName: string;
  dishPrice: number;
  quantity: number;
}