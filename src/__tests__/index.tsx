import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Home from "../pages/index";

// Mock das dependências
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

// Mock do store Redux
const mockStore = configureStore({
  reducer: {
    whitelabel: (state = {}) => state,
    basket: (state = { items: [] }) => state,
  },
});

// Add Next.js router mock
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

// Mock data para os props
const mockProps = {
  categories: [
    {
      id: "242403",
      name: "Burgers",
      imageUrl:
        "https://preodemo.gumlet.io/usr/venue/7602/section/646fbe4c64a6f.png",
    },
    {
      id: "242404",
      name: "Drinks",
      imageUrl:
        "https://preodemo.gumlet.io/usr/venue/7602/section/646fbe5dc1bf3.png",
    },
    {
      id: "242677",
      name: "Desserts",
      imageUrl:
        "https://preodemo.gumlet.io/usr/venue/7602/section/646fbe93cb615.png",
    },
  ],
  productsList: {
    burgers: [
      {
        id: 1625701,
        name: "Hard Core",
        description:
          "180g angus beef burger, with shredded ribs, gruyere cheese, caramelized onions, lettuce, confit tomato, special house bread, served with fried cassava and passion fruit chipotle.",
        alcoholic: 0,
        price: 33,
        position: 0,
        visible: 1,
        availabilityType: "AVAILABLE_NOW",
        sku: "I1625701",
        images: [
          {
            id: 108305,
            image:
              "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbdc8cecca.png",
          },
        ],
        available: true,
        imageUrl:
          "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbdc8cecca.png",
        modifiers: [
          {
            id: 1625701,
            name: "Hard Core",
            minChoices: 1,
            maxChoices: 1,
            items: [
              {
                id: 1625701,
                name: "Hard Core",
                price: 33,
                maxChoices: 1,
                visible: 1,
                available: true,
              },
            ],
          },
        ],
        section: "burgers",
      },
      {
        id: 1625702,
        name: "Smash Brooks",
        description:
          "100g pressed hamburger, mozzarella cheese, pickles, red onion, grilled bacon and traditional Heinz mayonnaise.",
        alcoholic: 0,
        price: 0,
        position: 1000,
        visible: 1,
        availabilityType: "AVAILABLE_NOW",
        sku: "I1625702",
        modifiers: [
          {
            id: 1625702,
            name: "Smash Brooks",
            minChoices: 1,
            maxChoices: 1,
            items: [
              {
                id: 1625702,
                name: "Smash Brooks",
                price: 0,
                maxChoices: 1,
                visible: 1,
                available: true,
              },
            ],
          },
        ],
        images: [
          {
            id: 108307,
            image:
              "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbe01b3373.png",
          },
        ],
        available: true,
        imageUrl:
          "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbe01b3373.png",
        section: "burgers",
      },
      {
        id: 1625703,
        name: "Ogro Burger",
        description:
          "180g angus beef burger, homemade molasses barbecue with golden bacon cubes, mozzarella cheese and homemade roasted garlic mayonnaise.",
        alcoholic: 0,
        price: 33,
        position: 2000,
        visible: 1,
        availabilityType: "AVAILABLE_NOW",
        sku: "I1625703",
        images: [
          {
            id: 108309,
            image:
              "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbe292998e.png",
          },
        ],
        available: true,
        imageUrl:
          "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbe292998e.png",
        modifiers: [
          {
            id: 1625703,
            name: "Ogro Burger",
            minChoices: 1,
            maxChoices: 1,
            items: [
              {
                id: 1625703,
                name: "Ogro Burger",
                price: 33,
                maxChoices: 1,
                visible: 1,
                available: true,
              },
            ],
          },
        ],
        section: "burgers",
      },
    ],
    drinks: [
      {
        id: 1625705,
        name: "Caipirinha",
        alcoholic: 0,
        price: 13,
        position: 0,
        visible: 1,
        availabilityType: "AVAILABLE_NOW",
        sku: "I1625705",
        available: true,
        imageUrl: "",
        modifiers: [
          {
            id: 1625705,
            name: "Caipirinha",
            minChoices: 1,
            maxChoices: 1,
            items: [
              {
                id: 1625705,
                name: "Caipirinha",
                price: 13,
                maxChoices: 1,
                visible: 1,
                available: true,
              },
            ],
          },
        ],
        section: "drinks",
      },
      {
        id: 1004123,
        name: "Red Label",
        alcoholic: 0,
        price: 13,
        position: 1000,
        availabilityType: "AVAILABLE_NOW",
        sku: "I1004123",
        available: true,
        imageUrl: "",
        modifiers: [
          {
            id: 1004123,
            name: "Red Label",
            minChoices: 1,
            maxChoices: 1,
            items: [
              {
                id: 1004123,
                name: "Red Label",
                price: 13,
                maxChoices: 1,
                visible: 1,
                available: true,
              },
            ],
          },
        ],
        section: "drinks",
      },
      {
        id: 1004122,
        name: "Smirnoff",
        alcoholic: 0,
        price: 10,
        position: 2000,
        availabilityType: "AVAILABLE_NOW",
        sku: "I1004122",
        available: true,
        imageUrl: "",
        modifiers: [
          {
            id: 1004122,
            name: "Smirnoff",
            minChoices: 1,
            maxChoices: 1,
            items: [
              {
                id: 1004122,
                name: "Smirnoff",
                price: 10,
                maxChoices: 1,
                visible: 1,
                available: true,
              },
            ],
          },
        ],
        section: "drinks",
      },
      {
        id: 1625706,
        name: "Pink Lemonade",
        alcoholic: 0,
        price: 12,
        position: 3000,
        availabilityType: "AVAILABLE_NOW",
        sku: "I1004123",
        available: true,
        imageUrl: "",
        modifiers: [
          {
            id: 1625706,
            name: "Pink Lemonade",
            minChoices: 1,
            maxChoices: 1,
            items: [
              {
                id: 1625706,
                name: "Pink Lemonade",
                price: 12,
                maxChoices: 1,
                visible: 1,
                available: true,
              },
            ],
          },
        ],
        section: "drinks",
      },
    ],
    desserts: [
      {
        id: 1625704,
        name: "Nutella",
        alcoholic: 0,
        price: 18.9,
        position: 0,
        visible: 1,
        availabilityType: "AVAILABLE_NOW",
        images: [
          {
            id: 108310,
            image:
              "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbf0bec8fe.png",
          },
        ],
        available: true,
        imageUrl:
          "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbf0bec8fe.png",
        modifiers: [
          {
            id: 1625704,
            name: "Nutella",
            minChoices: 1,
            maxChoices: 1,
            items: [
              {
                id: 1625704,
                name: "Nutella",
                price: 18.9,
                maxChoices: 1,
                visible: 1,
                available: true,
              },
            ],
          },
        ],
        section: "desserts",
      },
    ],
  },
  whiteLabelConfig: {
    id: 7602,
    name: "BURGERS RESTAURANT",
    internalName: "BURGERS RESTAURANT",
    description: null,
    liveFlag: 1,
    demoFlag: 1,
    address1: "Rua XX-X, 1-11",
    address2: "XXX",
    address3: null,
    city: "Bauru",
    county: "BR",
    postcode: "17012-360",
    country: "BR",
    timezoneOffset: "-03:00",
    locale: "pt-BR",
    timeZone: "America/Sao_Paulo",
    webSettings: {
      id: 5854,
      venueId: 7602,
      bannerImage:
        "https://preodemo.gumlet.io/usr/venue/7602/web/646fbf3abf9d0.png",
      backgroundColour: "#ffffff",
      primaryColour: "#4f372f",
      primaryColourHover: "#4f372f",
      navBackgroundColour: "#4f372f",
    },
    ccy: "BRL",
    ccySymbol: "R$",
    currency: "R$",
  },
  isLoading: true,
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(<Provider store={mockStore}>{component}</Provider>);
};

describe("Home Page", () => {
  it("should render loading state initially", () => {
    // Remover as props para forçar o loading
    const propsWithoutData = {
      categories: null,
      productsList: null,
      whiteLabelConfig: mockProps.whiteLabelConfig,
    };
    // Verifica se o componente está renderizando o loading enquanto nao tem dados
    const { getByTestId } = renderWithProvider(<Home {...propsWithoutData} />);
    expect(getByTestId("loading")).toBeInTheDocument();
  });

  // Verifica se nao mostra o loading quando tem dados
  it("should not show loading when data is available", () => {
    const { queryByTestId } = renderWithProvider(<Home {...mockProps} />);
    expect(queryByTestId("loading")).not.toBeInTheDocument();
  });

  it("should render categories correctly", () => {
    renderWithProvider(<Home {...mockProps} />);

    mockProps.categories.forEach((category) => {
      const elements = screen.getAllByText(category.name);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it("should filter products when searching", () => {
    renderWithProvider(<Home {...mockProps} />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "Ogro Burger" } });

    expect(screen.getByText("Ogro Burger")).toBeInTheDocument();
    expect(screen.queryByText("Caipirinha")).not.toBeInTheDocument();
  });

  it("should toggle sections when clicking on section headers", () => {
    renderWithProvider(<Home {...mockProps} />);

    const burgersSection = screen.getByText("Burgers");
    fireEvent.click(burgersSection);
  });

  it("should reset filters when clicking reset button", async () => {
    renderWithProvider(<Home {...mockProps} />);

    // Primeiro, aplicamos um filtro
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "Ogro Burger" } });

    // Procura pelo botão de reset usando um seletor mais flexível
    const resetButton = screen.getByTestId("reset-filters-button");
    fireEvent.click(resetButton);

    // Verificamos se todos os itens estão visíveis novamente
    await waitFor(() => {
      expect(screen.getByText("Ogro Burger")).toBeInTheDocument();
      expect(screen.getByText("Caipirinha")).toBeInTheDocument();
    });
  });

  it("should apply white label configuration", () => {
    renderWithProvider(<Home {...mockProps} />);

    const root = document.documentElement;
    const styles = getComputedStyle(root);

    expect(styles.getPropertyValue("--primary-color")).toBe(
      mockProps.whiteLabelConfig.webSettings.primaryColour
    );
    expect(styles.getPropertyValue("--header-color")).toBe(
      mockProps.whiteLabelConfig.webSettings.navBackgroundColour
    );
  });
});
