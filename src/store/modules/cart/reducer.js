export default function cart(state = [], action) {
  /** adicionando elementos dentro, REDUX são imutaveis */
  switch (action.type) {
    /** switch garante que ele vai ouvir a acao */
    case 'ADD_TO_CART':
      /** copia todos produtos e adiciona o action.product */
      return [...state, action.product];
    default:
      return state;
  }
}
