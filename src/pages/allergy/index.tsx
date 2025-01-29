import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { X } from "lucide-react";
import { Modal } from "@/components/Modal";
import { useTranslation } from "react-i18next";

const productComposition = {
  hardcore: {
    name: "Hard Core",
    ingredients: [
      "Hambúrguer angus 180g",
      "Costela desfiada",
      "Queijo gruyere",
      "Cebola caramelizada",
      "Alface",
      "Tomate confitado",
      "Pão especial da casa",
      "Mandioca frita",
      "Chipotle de maracujá",
    ],
  },
  smashbrooks: {
    name: "Smash Brooks",
    ingredients: [
      "Hambúrguer prensado 100g",
      "Queijo mussarela",
      "Picles",
      "Cebola roxa",
      "Bacon grelhado",
      "Maionese Heinz tradicional",
    ],
  },
  ogroburger: {
    name: "Ogro Burger",
    ingredients: [
      "Hambúrguer angus 180g",
      "Barbecue caseiro de melado",
      "Cubos de bacon dourado",
      "Queijo mussarela",
      "Maionese caseira de alho assado",
    ],
  },
  caipirinha: {
    name: "Caipirinha",
    ingredients: ["Cachaça", "Limão", "Açúcar", "Gelo"],
  },

  redlabel: {
    name: "Red Label",
    ingredients: [
      "Whisky escocês",
      "Água",
      "Malte",
      "Cereais",
      "Corante caramelo",
    ],
  },

  smirnoff: {
    name: "Smirnoff",
    ingredients: ["Vodka", "Água", "Cereais", "Álcool de cereais"],
  },
  pinklemonade: {
    name: "Pink Lemonade",
    ingredients: [
      "Água gaseificada",
      "Suco de limão",
      "Xarope de framboesa",
      "Corante natural",
      "Açúcar",
    ],
  },
  nutella: {
    name: "Nutella",
    ingredients: [
      "Açúcar",
      "Óleo de palma",
      "Avelãs (13%)",
      "Cacau em pó (7.4%)",
      "Leite em pó (6.6%)",
      "Soro de leite em pó",
      "Lecitina de soja",
      "Vanilina",
    ],
  },
};

export default function CompositionModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    router.back();
  };

  useEffect(() => {
    if (router.isReady) {
      setIsModalOpen(true);
    }
  }, [router.isReady]);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="w-full h-full flex flex-col bg-white rounded-lg max-w-md mx-auto">
        <header className="relative p-4 border-b border-gray20">
          <h2 className="text-2xl font-bold text-center">
            {t("products.composition")}
          </h2>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-primary hover:cursor-pointer"
            aria-label="Close Modal"
          >
            <X />
          </button>
        </header>

        <div className="flex-1 overflow-auto p-4">
          {Object.values(productComposition).map((product) => (
            <div key={product.name} className="mb-6">
              <h3 className="text-lg font-bold text-brown500 mb-2">
                {product.name}
              </h3>
              <ul className="space-y-2">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-brown500 mr-2">•</span>
                    <span className="text-gray40">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
