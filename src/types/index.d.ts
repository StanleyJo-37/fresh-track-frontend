export interface UserType {
  username: string;
  avatar?: string;
  email?: string;
}

export interface ResultsType {}

export type FoodResult = {
  id?: number;
  local_name: string;
  food_type: string;
  freshness: number;
  fresh_till: string;
};

export type InventoryCardProps = {
  id: number;
  local_name: string;
  scientific_name: string;
  quantity: number;
  fresh_until: Date;
};

export type RegisterProps = {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
};

export type LoginProps = {
  username: string;
  password: string;
};

export type AddFoodInventoryProps = {
  food_product_id: number;
  fresh_until: string;
  quantity: number;
};

export type InventoryFoodInfo = {
  quantity: number;
};

export type InventoryItem = {
  id: number;
  local_name: string;
  scientific_name: string;
  fresh_until: string,
  bought_at: string;
  quantity: number;
  status: 0 | 1 | 2 | 3;
}