import produce from 'immer';

export default function cart(state = [], action) {
  /** adicionando elementos dentro, REDUX são imutaveis */
  switch (action.type) {
    /** switch garante que ele vai ouvir a acao */
    case '@cart/ADD':
      /** copia todos produtos e adiciona o action.product */
      return produce(state, (draft) => {
        // verifico se o item que já existe no meu vetor
        const productIndex = draft.findIndex((p) => p.id === action.product.id);
        // se sim, eu só incremento o meu amount
        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        } else {
          draft.push({ ...action.product, amount: 1 });
        }
      });
    case '@cart/REMOVE':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id === action.id);
        // se encontrou
        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    default:
      return state;
  }
}
