"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { Dot, X } from "lucide-react";

import { addProduct } from "@/store/basket";
import { api } from "@/api/axios";
import { ModifierProps, ProductProps, ProductDetailsInterface } from "@/types";

import { useTranslation } from "react-i18next";

import { ProductItemOption } from "@/components/ProductItemOption";
import { Modal } from "@/components/Modal";
import { Loading } from "@/components/Loading";
import { QuantityControls } from "@/components/QuantityControls";

import { useAppDispatch } from "@/hooks";
import { useProduct } from "@/hooks/useProduct";

export default function ProductDetails({ product }: ProductDetailsInterface) {
  const router = useRouter();
  const { isFallback } = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    quantity,
    selectedOption,
    selectedItem,
    totalPrice,
    handleAddQuantity,
    handleRemoveQuantity,
    setSelectedOption,
  } = useProduct({ product });

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  const handleAddItem = () => {
    if (!selectedItem) return;

    const newItem = {
      name: product.name,
      id: selectedItem.id,
      variant: selectedItem.name,
      price: selectedItem.price,
      quantity,
      identification_quantity: Number(product.id),
    };

    dispatch(addProduct(newItem));
    closeModal();
  };

  useEffect(() => {
    if (router.isReady) {
      setIsModalOpen(true);
    }
  }, [router.isReady]);

  if (isFallback) {
    return <Loading />;
  }

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
            className="absolute top-8 right-4 text-primary hover:cursor-point bg-white p-1 rounded-full"
            aria-label="Close Modal"
          >
            <X />
          </button>
        </header>

        <div className="flex flex-col flex-1 overflow-auto p-4">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray40 font-normal text-base mb-2">
            {product.description}
          </p>
          <div className=" mb-2 py-4">
            <p className=" text-gray40 text-base font-bold">
              {t("choose_your_size")}
            </p>
            <p className=" text-gray30 font-normal">{t("select_option")}</p>
          </div>

          <div className="flex flex-col gap-4 mb-4">
            {product.modifiers[0].items.map((option: ModifierProps) => {
              return (
                <ProductItemOption
                  key={option.id}
                  name={option.name}
                  price={option.price}
                  isSelected={option.id.toString() === selectedOption}
                  handleOptionChange={setSelectedOption}
                  value={option.id.toString()}
                />
              );
            })}
          </div>
          <div className="flex justify-center mb-4">
            <QuantityControls
              isCart={false}
              quantity={quantity}
              itemName={product.name}
              onAdd={handleAddQuantity}
              onRemove={handleRemoveQuantity}
            />
          </div>

          <button
            onClick={() => handleAddItem()}
            className="w-full flex justify-center bg-brown500 px-8 py-2  text-white font-bold rounded-3xl"
          >
            {t("add_to_cart")} <Dot /> {totalPrice}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// Função auxiliar para buscar os dados do menu
async function getMenuData() {
  try {
    const { data } = await api.get("challenge/menu");
    return data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return null;
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // Não pré-gera nenhuma página
    fallback: "blocking", // Usa SSR na primeira vez que a página é acessada
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id) {
    return { notFound: true };
  }

  const menuData = await getMenuData();

  if (!menuData) {
    return { notFound: true };
  }

  const id = params.id as string;

  // Procura o produto em todas as seções
  const product = menuData.sections.reduce(
    (found: ProductProps | null, section: { items: ProductProps[] }) => {
      if (found) return found;
      return section.items.find(
        (item: ProductProps) => item.id.toString() === id
      );
    },
    null
  );

  if (!product) {
    return { notFound: true };
  }

  const normalizedProduct = {
    ...product,
    identification_quantity: product.id,
    imageUrl: product.images?.[0]?.image || "",
    modifiers: product.modifiers
      ? product.modifiers.map((modifier: ModifierProps) => ({
          ...modifier,
          identification_quantity: product.id,
        }))
      : [
          {
            id: product.id,
            identification_quantity: product.id,
            items: [
              {
                id: product.id,
                name: product.name,
                price: product.price,
              },
            ],
          },
        ],
  };

  return {
    props: {
      product: normalizedProduct,
    },
    revalidate: 60 * 60, // 1 hora
  };
};
