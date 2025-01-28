// React e bibliotecas externas
import { useState, ChangeEvent, useEffect } from "react";
import { GetStaticProps } from "next";
import { ReplyAll } from "lucide-react";

import { useTranslation } from "react-i18next";

// Hooks
import { useAppDispatch } from "@hooks";

// Componentes
import { Category } from "@/components/Category";
import { InputSearch } from "@/components/InputSearch";
import { ProductItem } from "@/components/ProductItem";
import { DrinkItem } from "@/components/DrinkItem";
import { ResumeBasket } from "@/components/ResumeBasket";
import { MenuSection } from "@/components/MenuSection";
import { Loading } from "@/components/Loading";

// Types
import {
  ProductProps,
  Section,
  CategoriesProps,
  DataFormatedProps,
  WhiteLabelProps,
} from "../types";

// Redux actions
import { setWhiteLabelConfig } from "@/store/whitelabel";

// API
import { api } from "@/api/axios";

// Adicione essa configuração no início do componente Home
const SECTIONS_CONFIG = {
  burgers: {
    id: "burgers",
    title: "Burguers",
    component: ProductItem,
  },
  drinks: {
    id: "drinks",
    title: "Drinks",
    component: DrinkItem,
  },
  desserts: {
    id: "desserts",
    title: "Desserts",
    component: ProductItem,
  },
} as const;

// Add this type definition near the top of the file, after other interfaces
type SectionId = keyof typeof SECTIONS_CONFIG;

export default function Home({
  categories,
  productsList,
  whiteLabelConfig,
}: WhiteLabelProps) {
  // console.log("===", whiteLabelConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [isActiveCategory, setIsActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<ProductProps[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    burgers: true,
    drinks: true,
    desserts: true,
  });

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categories && productsList) {
      setIsLoading(false);
    }
    // console.log("===", whiteLabelConfig);
  }, [categories, productsList, whiteLabelConfig]);

  useEffect(() => {
    // Configura as variáveis CSS customizadas
    document.documentElement.style.setProperty(
      "--primary-color",
      whiteLabelConfig.webSettings.primaryColour
    );
    document.documentElement.style.setProperty(
      "--header-color",
      whiteLabelConfig.webSettings.navBackgroundColour
    );

    // Atualiza o estado do Redux
    dispatch(
      setWhiteLabelConfig({
        ...whiteLabelConfig.webSettings,
        locale: whiteLabelConfig.locale,
        // locale: "en-US",
      })
    );
  }, [dispatch, whiteLabelConfig]);

  const toggleSection = (section: SectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // - Pesquisa um item
  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const results = Object.values(productsList!).flatMap((product) =>
      product.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(term);
        const categoryMatch = item.section.toLowerCase().includes(term);
        const priceMatch = item.price?.toString().includes(term);

        return nameMatch || categoryMatch || priceMatch;
      })
    );

    if (results.length > 0) {
      setIsActiveCategory(results[0].section);
    }
    setFilteredItems(results);
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <InputSearch value={searchTerm} onChange={handleSearch} />
      </div>

      <div className="flex mt-8">
        <div className="w-full md:w-3/5 shadow-2xl">
          <div className="flex w-full  h-[190px] items-start ">
            {categories!.map((category) => (
              <Category
                key={category.id}
                id={category.id}
                imageUrl={category.imageUrl}
                name={category.name}
                isActive={
                  isActiveCategory === category.name.toLocaleLowerCase()
                }
                onClick={() =>
                  setIsActiveCategory(category.name.toLocaleLowerCase())
                }
              />
            ))}
          </div>

          <div className="mt-4">
            {isActiveCategory !== "all" && (
              <div className="flex w-full justify-center items-center gap-2 py-4">
                <button
                  data-testid="reset-filters-button"
                  type="button"
                  role="button"
                  aria-label="Resetar todos os filtros"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  onClick={() => {
                    setIsActiveCategory("all");
                    setFilteredItems([]);
                    setSearchTerm("");
                  }}
                >
                  <ReplyAll size={20} />
                  <span>Reset filters</span>
                </button>
              </div>
            )}

            {Object.entries(SECTIONS_CONFIG).map(([sectionId, config]) => {
              if (isActiveCategory !== "all" && isActiveCategory !== sectionId)
                return null;

              return (
                <MenuSection
                  key={sectionId}
                  title={config.title}
                  isExpanded={expandedSections[sectionId as SectionId]}
                  onToggle={() => toggleSection(sectionId as SectionId)}
                  items={productsList![sectionId as SectionId]}
                  ItemComponent={config.component}
                  filteredItems={filteredItems}
                />
              );
            })}
          </div>
        </div>

        <div className="hidden md:block md:w-2/5 bg-blue10 shadow-2xl h-full md:ml-6">
          <div className="mb-4 px-4 pt-4">
            <h2 className="text-gray40 text-2xl font-medium">{t("cart")}</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ResumeBasket />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<WhiteLabelProps> = async () => {
  try {
    // Fetch both menu and whitelabel data in parallel
    const [menuResponse, whitelabelResponse] = await Promise.all([
      api.get("challenge/menu"),
      api.get("challenge/venue/9"),
    ]);

    const menuData = menuResponse.data;

    const whiteLabelConfig = whitelabelResponse.data;

    const productsList = menuData.sections.reduce(
      (
        acc: {
          [key: string]: ProductProps[];
        },
        section: Section
      ) => {
        acc[section.name.toLowerCase()] = section.items.map((item) => {
          const modifiers = [
            {
              id: item.id,
              name: item.name,
              minChoices: 1,
              maxChoices: 1,
              items: [
                {
                  id: item.id,
                  name: item.name,
                  price: item.price || 0.0,
                  maxChoices: 1,
                  visible: 1,
                  available: item.price !== undefined,
                },
              ],
            },
          ];

          return {
            ...item,
            imageUrl: item.images?.[0]?.image || "",
            modifiers,
            section: section.name.toLowerCase(),
          };
        });

        return acc;
      },

      {}
    );

    const categories = menuData.sections.map((item: CategoriesProps) => {
      return {
        id: item.id.toString(),
        name: item.name,
        imageUrl: item.images[0].image,
      };
    });

    return {
      props: {
        categories,
        productsList,
        whiteLabelConfig,
      },
      revalidate: 60 * 60 * 1, // Refresh every 1 hour
    };
  } catch (error) {
    return {
      props: {
        categories: [],
        productsList: {} as DataFormatedProps,
        whiteLabelConfig: {} as WhiteLabelProps["whiteLabelConfig"],
      },
    };
  }
};
