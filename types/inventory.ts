import { Vegetable } from "./vegetable"

export type Inventory = {
  id?: number,
  vegetable: Vegetable,
  added_at: Date,
  fresh_till: Date
}