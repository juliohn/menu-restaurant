import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "@/types";

// -  Definição da interface para o estado
interface ItemState {
  item: ProductProps | null;
}

// - Estado inicial
const initialState: ItemState = {
  item: null,
};

//- Criação do slice
export const currentItem = createSlice({
  name: "item",
  initialState,
  reducers: {
    // - Ação para definir o item
    setCurrentItem: (state, action: PayloadAction<ProductProps | null>) => {
      state.item = action.payload;
    },
    // - Ação para limpar a cesta
    clearItem: (state) => {
      state.item = null;
    },
  },
});

// - Exporta as ações do item
export const { setCurrentItem, clearItem } = currentItem.actions;
