export interface ModifierProps {
  id: string;
  name: string;
  price: string;
}

interface ModifiersProductProps {
  items: ModifierProps[];
}

export interface ProductProps {
  id: string;
  name: string;
  price: string;
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
