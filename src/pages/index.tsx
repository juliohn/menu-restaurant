import { useState } from "react";
import { GetStaticProps } from "next";

import { Category } from "@/components/Category";
import { InputSearch } from "@/components/InputSearch";
import { ProductItem } from "@/components/ProductItem";
import { DrinkItem } from "@/components/DrinkItem";
import { ResumeBasket } from "@/components/ResumeBasket";

import { ProductProps } from "./product/types";

import { ChevronUp, ReplyAll } from "lucide-react";

import { api } from "@/api/axios";

interface CategoriesProps {
  id: string;
  title: string;
  imageUrl: string;
}

interface DrinksProps {
  id: string;
  price: string;
  title: string;
}

interface DessertsProps {
  id: string;
  price: string;
  imageUrl: string;
  title: string;
}

interface DataProps {
  categories?: CategoriesProps[];
  burguers?: ProductProps[];
  drinks?: DrinksProps[];
  desserts?: DessertsProps[];
}

export default function Home({
  categories,
  burguers,
  drinks,
  desserts,
}: DataProps) {
  const [isActiveCategory, setIsActiveCategory] = useState("");

  console.log(categories);

  return (
    <div className="">
      <InputSearch />

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
                  onClick={() => setIsActiveCategory(category.id.toString())}
                />
              );
            })}
          </div>

          {isActiveCategory !== "" && (
            <div className="flex w-full justify-center items-center ">
              <a onClick={() => setIsActiveCategory("")}>
                <ReplyAll />
                <span>Reset</span>
              </a>
            </div>
          )}

          {(isActiveCategory === burguers!.sectionId ||
            isActiveCategory === "") && (
            <>
              <div className="flex justify-between items-center ">
                <h1 className="text-black font-medium text-2xl">Burguers</h1>
                <ChevronUp className="text-black" />
              </div>

              <div className="h-auto flex flex-col  gap-8  mt-8">
                {burguers!.data.map((burguer: ProductProps) => {
                  return <ProductItem key={burguer.id} item={burguer} />;
                })}
              </div>
            </>
          )}

          {(isActiveCategory === drinks!.sectionId ||
            isActiveCategory === "") && (
            <>
              <div className="flex justify-between items-center mt-8">
                <h1 className="text-black font-medium text-2xl">Drinks</h1>
                <ChevronUp className="text-black" />
              </div>

              <div className="h-auto flex flex-col  gap-8  mt-8">
                {drinks!.data.map((drink) => {
                  return <DrinkItem key={drink.id} item={drink} />;
                })}
              </div>
            </>
          )}

          {(isActiveCategory === desserts!.sectionId ||
            isActiveCategory === "") && (
            <>
              <div className="flex justify-between items-center mt-8">
                <h1 className="text-black font-medium text-2xl">Desserts</h1>
                <ChevronUp className="text-black" />
              </div>

              <div className="h-auto flex flex-col  gap-8  mt-8 md:mb-8">
                {desserts!.data!.map((dessert: ProductProps) => {
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

    const categories = data.sections.map((item) => {
      return {
        id: item.id.toString(),
        name: item.name,
        imageUrl: item.images[0].image,
      };
    });

    const burguers = {
      sectionId: data.sections[0].id.toString(),
      data: data.sections[0].items.map((item) => {
        const modifiers =
          item.modifiers === undefined
            ? [
                {
                  id: item.id,
                  items: [{ ...item }],
                },
              ]
            : item.modifiers;

        return {
          ...item,
          imageUrl: item.images[0].image,
          modifiers,
        };
      }),
    };

    const drinks = {
      sectionId: data.sections[1].id.toString(),
      data: data.sections[1].items.map((item) => {
        return {
          ...item,
        };
      }),
    };

    const desserts = {
      sectionId: data.sections[2].id.toString(),
      data: data.sections[2].items.map((item) => {
        const modifiers = [
          {
            id: item.id,
            items: [{ ...item }],
          },
        ];

        return {
          ...item,
          imageUrl: item.images[0].image,
          modifiers,
        };
      }),
    };

    return {
      props: {
        categories,
        burguers,
        drinks,
        desserts,
      },
      revalidate: 60 * 60 * 1, // Refresh a cada 1 hora
    };
  } catch (error) {
    console.log("Erro ao buscar os dados:", error);
    return {
      props: {
        props: {
          categories: [],
          burguers: [],
          drinks: [],
          desserts: [],
        },
      },
    };
  }
};
