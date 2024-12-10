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
