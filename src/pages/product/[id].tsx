"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

import { AppDispatch } from "@/store";
import { addProduct } from "@/store/basket";

import { ProductItemOption } from "@/components/ProductItemOption";
import { Modal } from "@/components/Modal";
import { Loading } from "@/components/Loading";

import { api } from "@/api/axios";
import { formatCurrencyDecimals } from "@/utils";
import { ModifierProps, ProductProps } from "@/types";

import { Dot, Minus, Plus, X } from "lucide-react";

interface ProductDetailsInterface {
  product: ProductProps;
}

export default function ProductDetails({ product }: ProductDetailsInterface) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <Loading />;
  }

  const dispatch: AppDispatch = useDispatch();

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [quantity, setQuantity] = useState(1);

  // - Começa sempre com o primeiro indice selecionado
  const [selectedOption, setSelectedOption] = useState<string>(
    product.modifiers[0].items[0].id.toString()
  );

  const handleAddQuantity = () => setQuantity(quantity + 1);

  const handleRemoveQuantity = () =>
    setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option.toString());
  };

  const handleCalculator = () => {
    const item = product.modifiers[0].items.find(
      (md) => md.id.toString() === selectedOption
    );

    return formatCurrencyDecimals(quantity * item!.price);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  const handleAddItem = () => {
    const option = product.modifiers[0].items.find(
      (md) => md.id.toString() === selectedOption
    );

    const newItem = {
      name: product.name,
      id: option!.id,
      variant: option!.name,
      price: option!.price,
      quantity,
    };

    dispatch(addProduct(newItem));
    closeModal();
  };

  useEffect(() => {
    if (router.isReady) {
      setIsModalOpen(true);
    }
  }, [product, router.isReady]);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className=" w-full h-full flex flex-col">
        <header className="w-full h-64">
          <Image
            className="h-full w-full object-cover"
            src={product.images[0].image}
            alt=""
            width={390}
            height={265}
          />

          <button
            onClick={closeModal}
            className="absolute top-8 right-4 text-brown500 hover:cursor-point bg-white p-1 rounded-full"
            aria-label="Close Modal"
          >
            <X />
          </button>
        </header>

        <div className="flex flex-col flex-1 overflow-auto p-4">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-40 font-normal text-base mb-2">
            {product.description}
          </p>
          <div className=" mb-2 py-4">
            <p className=" text-gray-40 text-base font-bold">
              Choose your size
            </p>
            <p className=" text-gray-30 font-normal">Select 1 option</p>
          </div>
          <div className="flex flex-col gap-4 mb-4">
            {product.modifiers[0].items.map((option: ModifierProps) => {
              return (
                <ProductItemOption
                  key={option.id}
                  name={option.name}
                  price={option.price}
                  isSelected={option.id.toString() === selectedOption}
                  handleOptionChange={handleOptionChange}
                  value={option.id}
                />
              );
            })}
          </div>
          <div className="flex justify-center items-center mb-4">
            <button
              onClick={handleRemoveQuantity}
              className="bg-gray10
              justify-center
              items-center
              p-1
              rounded-full"
            >
              <Minus className="text-center" />
            </button>
            <span className="mx-8 text-lg font-semibold">{quantity}</span>
            <button
              onClick={handleAddQuantity}
              className="bg-brown500
              justify-center
              items-center
              p-1
              rounded-full"
            >
              <Plus className="text-white" />
            </button>
          </div>

          <button
            onClick={() => handleAddItem()}
            className="w-full flex justify-center bg-brown500 px-8 py-2  text-white font-bold rounded-3xl"
          >
            Add to Order <Dot /> {handleCalculator()}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// Função para gerar as páginas estáticas
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const id = context.params?.id;

    const response = await api.get("challenge/menu");
    const data = response.data;

    let product = null;

    // - procura o id do produto na categoria burguer
    const findProductInBurguers = data.sections[0].items.find(
      (item: ProductProps) => item.id.toString() === id
    );

    if (findProductInBurguers) {
      product = findProductInBurguers;
    }

    // - procura o id do produto na categoria dessert
    const findProductInDisserts = data.sections[2].items.find(
      (item: ProductProps) => item.id.toString() === id
    );

    if (findProductInDisserts != undefined) {
      product = findProductInDisserts;
    }

    // - formata para exibir usando o mesmo component para desserts e burguers
    const modifiers =
      product.modifiers === undefined
        ? [
            {
              id: product.id,
              items: [{ ...product }],
            },
          ]
        : product.modifiers;

    product = {
      ...product,
      imageUrl: product.images[0].image,
      modifiers,
    };

    return {
      props: {
        product,
      },
      revalidate: 60 * 60 * 1, // - Refresh a cada 1 hora
    };
  } catch (error) {
    console.log("Erro ao buscar os dados:", error);
    return {
      props: {
        product: [],
      },
    };
  }
};
