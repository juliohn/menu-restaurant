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
}

export interface DrinkProps {
  id: string;
  name: string;
  description?: string;
  price: number;
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
