import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// -  Definição da interface para o item da cesta
export interface BasketItem {
  id: string;
  name: string;
  variant?: string;
  price: number;
  quantity: number;
}

// -  Definição da interface para o estado
interface ItemState {
  items: BasketItem[];
}

// - Estado inicial
const initialState: ItemState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<BasketItem>) => {
      const item = action.payload;
      const existingItem = state.items.find((st) => st.id === item.id);

      if (existingItem) {
        // - adiciona a quantidade enviada por parametro
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
    removeProduct: (state, action: PayloadAction<BasketItem>) => {
      const item = action.payload;
      const existingItem = state.items.find((st) => st.id === item.id);

      if (existingItem) {
        // - remove de 1 em 1
        existingItem.quantity -= 1;
      }
    },
  },
});

// - exporta as funcoes da cesta de produtos que adiciona ou remove itens
export const { addProduct, removeProduct } = basketSlice.actions;
