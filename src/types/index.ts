import { ChangeEvent } from "react";

export interface ModifierProps {
  id: string;
  name: string;
  price: number;
}
export interface ModifiersProductProps {
  items: ModifierProps[];
}

export interface ImageProps {
  image: string;
}

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  modifiers: ModifiersProductProps[];
  images: ImageProps[];
  section: string;
  identification_quantity: number;
}

export interface DrinkProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  identification_quantity: number;
}

export interface DrinkItemProps {
  item: DrinkProps;
}

export interface Section {
  id: number;
  name: string;
  items: ProductProps[];
}

export interface CategoriesProps {
  id: string;
  name: string;
  imageUrl: string;
  images: ImageProps[];
}

export interface DataFormatedProps {
  [key: string]: ProductProps[];
}

export interface DataProps {
  categories?: CategoriesProps[];
  productsList?: DataFormatedProps | undefined;
}

export interface WhiteLabelProps extends DataProps {
  whiteLabelConfig: {
    id: number;
    name: string;
    internalName: string;
    description: string | null;
    liveFlag: number;
    demoFlag: number;
    address1: string;
    address2: string;
    address3: string | null;
    city: string;
    county: string;
    postcode: string;
    country: string;
    timezoneOffset: string;
    locale: string;
    timeZone: string;
    webSettings: {
      id: number;
      venueId: number;
      bannerImage: string;
      backgroundColour: string;
      primaryColour: string;
      primaryColourHover: string;
      navBackgroundColour: string;
    };
    ccy: string;
    ccySymbol: string;
    currency: string;
  };
}

export interface MenuSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  items: ProductProps[];
  ItemComponent: React.ComponentType<{ item: ProductProps }>;
  filteredItems: ProductProps[];
}

export interface CategoryProps {
  id: string;
  imageUrl: string;
  name: string;
  isActive?: boolean;
  onClick: (id: string) => void;
}

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface ProductItemOptionProps {
  name: string;
  price: number;
  handleOptionChange: (id: string) => void;
  isSelected: boolean;
  value: string;
}

export interface UseProductProps {
  product: ProductProps;
  initialQuantity?: number;
}

export interface ItemProps {
  item: ProductProps;
}
export interface ProductDetailsInterface {
  product: ProductProps;
}

export interface BasketItem {
  id: string;
  name: string;
  variant?: string;
  price: number;
  quantity: number;
  identification_quantity: number;
}

// -  Definição da interface para o estado
export interface ItemBasketState {
  items: BasketItem[];
}

export interface WhiteLabelState {
  primaryColour: string;
  navBackgroundColour: string;
  bannerImage: string;
  locale: string;
}
