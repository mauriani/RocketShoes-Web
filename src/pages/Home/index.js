import React from 'react';

import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';

export default function Home() {
  return (
    <ProductList>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-olympikus-globe-se-814-masculino/26/D22-3837-026/D22-3837-026_zoom2.jpg?ts=1595354797&ims=326x"
          alt="Tenis"
        />

        <strong>Tênis top!</strong>

        <span>R$129,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>

      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-olympikus-globe-se-814-masculino/26/D22-3837-026/D22-3837-026_zoom2.jpg?ts=1595354797&ims=326x"
          alt="Tenis"
        />

        <strong>Tênis top!</strong>

        <span>R$129,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>

      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-olympikus-globe-se-814-masculino/26/D22-3837-026/D22-3837-026_zoom2.jpg?ts=1595354797&ims=326x"
          alt="Tenis"
        />

        <strong>Tênis top!</strong>

        <span>R$129,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>

      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-olympikus-globe-se-814-masculino/26/D22-3837-026/D22-3837-026_zoom2.jpg?ts=1595354797&ims=326x"
          alt="Tenis"
        />

        <strong>Tênis top!</strong>

        <span>R$129,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>

      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-olympikus-globe-se-814-masculino/26/D22-3837-026/D22-3837-026_zoom2.jpg?ts=1595354797&ims=326x"
          alt="Tenis"
        />

        <strong>Tênis top!</strong>

        <span>R$129,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
    </ProductList>
  );
}
