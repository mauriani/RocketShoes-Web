import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';
import { addToCartSuccess, updateAmountSuccess } from './actions';

// * -> significa um generator ou async
function* addToCart({ id }) {
  // verifica se o produto esta no carrinho
  const productExists = yield select((state) =>
    state.cart.find((p) => p.id === id)
  );

  // verificando se temos o produto em estoque

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;
  // se o productExist não for nulo
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    // yield - é o generator do await, nossa chamada a api.
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    // put dispara uma action
    yield put(addToCartSuccess(data));
    history.push('/cart');
  }
}

// função que controla o numero de produtos no carrinho (buttons + e -)
function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);

  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

// ouvindo quando a action for adicionada
export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
