import produce from 'immer';

export default function cart(state = [], action) {
  /** adicionando elementos dentro, REDUX são imutaveis */
  switch (action.type) {
    /** switch garante que ele vai ouvir a acao */
    case '@cart/ADD_SUCCESS':
      /** copia todos produtos e adiciona o action.product */
      return produce(state, (draft) => {
        const { product } = action;
        draft.push(product);
      });
    case '@cart/REMOVE':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id === action.id);
        // se encontrou
        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id === action.id);
        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state;
  }
}
