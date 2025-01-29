# Menu Restaurante

    Este projeto simula um menu de restaurante que permite aos usuários visualizar e adicionar itens ao carrinho de compras, pode filtrar itens por categoria e por nome e ainda escolher uma variacao do produto quando disponivel

## Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn


## Instalação

1. Clone o repositório
2. Instale as dependências (yarn install)
3. Rode o projeto (yarn dev)
4. Rode os testes (yarn test)

## Testes

Os testes são feitos com Jest e React Testing Library.  

## Estrutura do Projeto

- src/api/
- src/components/
- src/hooks/
- src/locales/
- src/pages/
- src/store/
- src/styles/
- src/types/

## Endpoints da API
- https://cdn-dev.preoday.com/challenge/venue/9
- https://cdn-dev.preoday.com/challenge/menu

## Configuração do i18n (Internationalization)

- src/locales/
- src/i18n

## Comentarios e considerações

- O projeto foi feito com Next.js, TailwindCSS, React, Redux, Jest e React Testing Library.
- Procurei componentizar o máximo possível, para que o código seja mais fácil de manter e de entender.
- Procurei manter a estrutura do projeto o mais simples possível, para que seja fácil de entender e de manter.
- O projeto usa os dados da API para manter a cor primaria, cor do header e banner da aplicacao, bem como a localizão PT-BR para o idioma default e moeda BRL.
- Pode ser alterado o idioma para EN-US e a moeda para USD utilizando o botao ao lado direito do header da aplicacao.
- O Projeto esta totalmente responsivo, e foi testado em um dispositivo mobile.
- Implementado pagina de contato e login fake apenas para simular a funcionalidade do menu de navegacao

- O projeto foi postado na vercel, e pode ser acessado em:
 https://menu-restaurant-beryl.vercel.app/

## Licença

Este projeto está sob a licença [MIT](https://choosealicense.com/licenses/mit/).
