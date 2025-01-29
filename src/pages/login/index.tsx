import React from "react";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implementar a lógica de autenticação aqui
    alert("Form submitted");
  };

  return (
    <div className="flex items-start justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 mt-16">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            {t("login.title")}
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                placeholder={t("login.email")}
                className="w-full px-3 py-2 border border-gray30 rounded-md focus:outline-none focus:ring-0"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder={t("login.password")}
                className="w-full px-3 py-2 border border-gray30 rounded-md focus:outline-none focus:ring-0"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                className="h-4 w-4 text-primary border-gray30 rounded"
              />
              <label className="ml-2 text-sm text-gray40">
                {t("login.remember")}
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t("login.submit")}
            </button>
            <div className="text-center">
              <a href="#" className="text-sm text-gray40 hover:text-gray-700">
                {t("login.forgot_password")}
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
