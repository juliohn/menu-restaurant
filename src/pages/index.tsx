import { useState, ChangeEvent } from "react";
import { GetStaticProps } from "next";

import { Category } from "@/components/Category";
import { InputSearch } from "@/components/InputSearch";
import { ProductItem } from "@/components/ProductItem";
import { DrinkItem } from "@/components/DrinkItem";
import { ResumeBasket } from "@/components/ResumeBasket";

import { ProductProps, DrinkProps, imageProps } from "../types";

import { ChevronUp, ReplyAll } from "lucide-react";

import { api } from "@/api/axios";

interface Section {
  id: number;
  name: string;
  items: ProductProps[];
}

interface CategoriesProps {
  id: string;
  name: string;
  imageUrl: string;
  images: imageProps[];
}

interface DataFormatedProps {
  [key: string]: ProductProps[];
}

interface DataProps {
  categories?: CategoriesProps[];
  productsList?: DataFormatedProps | undefined;
}

export default function Home({ categories, productsList }: DataProps) {
  const [isActiveCategory, setIsActiveCategory] = useState("all");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<ProductProps[]>([]);

  // - Pesquisa um item
  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const results = Object.values(productsList!).flatMap((product) =>
      product.filter((item) => item.name.toLowerCase().includes(term))
    );

    setIsActiveCategory(results[0].section);
    setFilteredItems(results);
  };

  return (
    <div className="">
      <InputSearch value={searchTerm} onChange={handleSearch} />

      <div className="flex gap-6 mt-2">
        <div className="md:w-3/5  md:px-4 bg-white">
          <div className="flex mt-4 w-full item-center gap-4 ">
            {categories!.map((category) => {
              return (
                <Category
                  key={category.id}
                  id={category.id}
                  imageUrl={category.imageUrl}
                  name={category.name}
                  isActive={isActiveCategory === category.id}
                  onClick={() =>
                    setIsActiveCategory(category.name.toLocaleLowerCase())
                  }
                />
              );
            })}
          </div>

          {isActiveCategory !== "" && (
            <div className="flex w-full justify-center items-center ">
              <a
                onClick={() => {
                  setIsActiveCategory("all");
                  setFilteredItems([]);
                  setSearchTerm("");
                }}
              >
                <ReplyAll />
                <span>Reset</span>
              </a>
            </div>
          )}

          {/* burgers */}
          {(isActiveCategory === "burgers" || isActiveCategory === "all") && (
            <>
              <div className="flex justify-between items-center ">
                <h1 className="text-black font-medium text-2xl">Burguers</h1>
                <ChevronUp className="text-black" />
              </div>

              <div className="h-auto flex flex-col  gap-8  mt-8">
                {filteredItems.length > 0
                  ? filteredItems!.map((burguer: ProductProps) => {
                      return <ProductItem key={burguer.id} item={burguer} />;
                    })
                  : productsList!.burgers.map((burguer: ProductProps) => {
                      return <ProductItem key={burguer.id} item={burguer} />;
                    })}
              </div>
            </>
          )}

          {/* Drinks */}
          {(isActiveCategory === "drinks" || isActiveCategory === "all") && (
            <>
              <div className="flex justify-between items-center mt-8">
                <h1 className="text-black font-medium text-2xl">Drinks</h1>
                <ChevronUp className="text-black" />
              </div>

              <div className="h-auto flex flex-col  gap-8  mt-8">
                {filteredItems.length > 0
                  ? filteredItems!.map((drink: DrinkProps) => {
                      return <DrinkItem key={drink.id} item={drink} />;
                    })
                  : productsList!.drinks.map((drink: DrinkProps) => {
                      return <DrinkItem key={drink.id} item={drink} />;
                    })}
              </div>
            </>
          )}

          {/* Desserts */}
          {(isActiveCategory === "desserts" || isActiveCategory === "all") && (
            <>
              <div className="flex justify-between items-center mt-8">
                <h1 className="text-black font-medium text-2xl">Desserts</h1>
                <ChevronUp className="text-black" />
              </div>

              <div className="h-auto flex flex-col  gap-8  mt-8 md:mb-8">
                dessert
                {filteredItems.length > 0
                  ? filteredItems!.map((dessert: ProductProps) => {
                      return <ProductItem key={dessert.id} item={dessert} />;
                    })
                  : productsList!.desserts.map((dessert: ProductProps) => {
                      return <ProductItem key={dessert.id} item={dessert} />;
                    })}
              </div>
            </>
          )}
        </div>

        <div className="w-2/5 bg-blue10 hidden md:flex flex-col">
          <div className="mb-4 px-4">
            <h2 className="text-gray40 text-2xl  font-medium"> Carrinho</h2>
          </div>
          <ResumeBasket />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<DataProps> = async () => {
  try {
    const response = await api.get("challenge/menu");
    const data = response.data;

    const productsList = data.sections.reduce(
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

    const categories = data.sections.map((item: CategoriesProps) => {
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
      },
      revalidate: 60 * 60 * 1, // Refresh a cada 1 hora
    };
  } catch (error) {
    // console.log("Erro ao buscar os dados:", error);
    return {
      props: {
        props: {
          categories: [],
          productsList: [],
        },
      },
    };
  }
};
