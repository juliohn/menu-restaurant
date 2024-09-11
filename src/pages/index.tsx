import { useState } from "react";

import Image from "next/image";

import { Category } from "@/components/Category";
import { InputSearch } from "@/components/InputSearch";
import { ChevronUp } from "lucide-react";
import { BurguerItem } from "@/components/BurguerItem";
import { DrinkItem } from "@/components/DrinkItem";
import { ResumeBasket } from "@/components/ResumeBasket";

export default function Home() {
  const [isActiveCategory, setIsActiveCategory] = useState<string>("242403");
  return (
    <div className="">
      <InputSearch />

      <div className="flex gap-6 mt-2">
        <div className="md:w-3/5  md:px-4 bg-white">
          <div className="flex mt-4 w-full item-center gap-4">
            <Category
              id={"242403"}
              imageUrl="https://preodemo.gumlet.io/usr/venue/7602/section/646fbe4c64a6f.png"
              title="Burguers"
              isActive={isActiveCategory === "242403"}
              onClick={setIsActiveCategory}
            />
            <Category
              id={"242404"}
              imageUrl="https://preodemo.gumlet.io/usr/venue/7602/section/646fbe5dc1bf3.png"
              title="Drinks"
              isActive={isActiveCategory === "242404"}
              onClick={setIsActiveCategory}
            />
            <Category
              id={"242405"}
              imageUrl="https://preodemo.gumlet.io/usr/venue/7602/section/646fbe93cb615.png"
              title="Desserts"
              isActive={isActiveCategory === "242405"}
              onClick={setIsActiveCategory}
            />
          </div>

          <div className="flex justify-between items-center ">
            <h1 className="text-black font-medium text-2xl">Burguers</h1>
            <ChevronUp className="text-black" />
          </div>

          <div className="h-auto flex flex-col  gap-8  mt-8">
            <BurguerItem
              price="33,90"
              imageUrl="https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbe292998e.png"
              title="Hardcore"
              description="180g angus beef burger, plus ribs, gruyere cheese 180g angus"
            />
            <BurguerItem
              price="33,90"
              imageUrl="https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbe292998e.png"
              title="Hardcore"
              description="180g angus beef burger, plus ribs, gruyere cheese 180g angus"
            />

            <BurguerItem
              price="33,90"
              imageUrl="https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbe292998e.png"
              title="Hardcore"
              description="180g angus beef burger, plus ribs, gruyere cheese 180g angus"
            />
          </div>

          <div className="flex justify-between items-center mt-8">
            <h1 className="text-black font-medium text-2xl">Drinks</h1>
            <ChevronUp className="text-black" />
          </div>

          <div className="h-auto flex flex-col  gap-8  mt-8">
            <DrinkItem
              price="49,80"
              title="Caipirinha"
              description="with sugar cane liquor loren with sugar cane liquor loren with sugar cane liquor loren with sugar cane liquor loren"
            />

            <DrinkItem price="13,00" title="Red label" />

            <DrinkItem
              price="10,00"
              title="Smirnoff"
              description="with sugar cane liquor"
            />
            <DrinkItem
              price="12,00"
              title="Pink Lemonade"
              description="Lemonade whipped with cherries and berries."
            />
          </div>
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
