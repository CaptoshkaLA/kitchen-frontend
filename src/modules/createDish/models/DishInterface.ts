import DISHCATEGORY from "@/modules/createDish/models/DishCategory.enum";
import DISHMENUTYPE from "@/modules/createDish/models/DishMenuType.enum";

interface Dish {
  menuId?: number,
  id: number,
  date?: string,
  name: string, 
  category: DISHCATEGORY, 
  menu_type: DISHMENUTYPE,
  description: string,
  price: number,
  pfc?: string,
  note?: string,
  image?: string,
}

export default Dish;