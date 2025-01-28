import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="flex items-start justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 mt-16">
        <div className="bg-white p-8 rounded-lg shadow-md">
          {!isSubmitted ? (
            <>
              <h1 className="text-2xl font-bold text-center mb-6">
                {t("contact.title", "Entre em Contato")}
              </h1>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder={t("contact.name", "Nome")}
                    className="w-full px-3 py-2 border border-gray20 rounded-md focus:outline-none focus:ring-0"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("contact.email", "E-mail")}
                    className="w-full px-3 py-2 border border-gray20 rounded-md focus:outline-none focus:ring-0"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder={t("contact.subject", "Assunto")}
                    className="w-full px-3 py-2 border border-gray20 rounded-md focus:outline-none focus:ring-0"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={t("contact.message", "Mensagem")}
                    className="w-full px-3 py-2 border border-gray20 rounded-md focus:outline-none focus:ring-0"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {t("contact.submit", "Enviar Mensagem")}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                {t("contact.success", "FORMULÁRIO ENVIADO COM SUCESSO")}
              </h2>
              <p className="text-gray-600">
                {t("contact.successMessage", "Obrigado pelo seu contato!")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
