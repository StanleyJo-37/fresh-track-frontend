import { AddFoodInventoryProps, InventoryFoodInfo } from "@/types";
import axios from "./axios";

const InventoryAPI = {
  all: async ({ token }: { token?: string }) => {
    return await axios.request({
      url: "/inventory/",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  },

  addItems: async ({
    food_items,
    token,
  }: {
    food_items: any;
    token?: string;
  }) => {
    return await axios.request({
      url: "/inventory/",
      method: "POST",
      data: {
        food_items
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  },

  deleteItem: async ({
    food_inventory_id,
    token,
  }: {
    food_inventory_id: number;
    token?: string;
  }) => {
    return await axios.request({
      url: "/inventory/",
      method: "DELETE",
      data: {
        food_inventory_id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  },

  editItem: async ({
    food_inventory_id,
    new_food_info,
    token,
  }: {
    food_inventory_id: number;
    new_food_info: InventoryFoodInfo;
    token?: string;
  }) => {
    return await axios.request({
      url: "/inventory/",
      method: "PUT",
      data: {
        food_inventory_id,
        new_food_info,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    });
  },
};

export default InventoryAPI;
