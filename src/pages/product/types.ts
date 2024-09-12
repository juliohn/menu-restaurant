export interface ModifierProps {
  id: string;
  name: string;
  price: number;
}

interface ModifiersProductProps {
  items: ModifierProps[];
}

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  modifiers?: ModifiersProductProps[];
}

interface Drinkprops {
  id: string;
  name: string;
  description?: string;
  price: number;
}

export interface DrinkItemprops {
  item: Drinkprops;
}
