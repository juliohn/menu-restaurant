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

export interface ProductsFormatedProps {
  sectionId: string;
  data: ProductProps[];
}
