export interface ModifierProps {
  id: string;
  name: string;
  price: number;
}
export interface ModifiersProductProps {
  items: ModifierProps[];
}

export interface imageProps {
  image: string;
}

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  modifiers: ModifiersProductProps[];
  images: imageProps[];
  section: string;
}

export interface DrinkProps {
  id: string;
  name: string;
  description?: string;
  price: number;
}

export interface DrinkItemprops {
  item: DrinkProps;
}
