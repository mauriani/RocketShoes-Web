### RocketShoes

Essa aplicação foi desenvolvida no módulo 07 do curso GoStack/Bootcamp da **Rocketseat.** O intuito desse módulo foi entender o que é redux e como usar.


<img src="https://user-images.githubusercontent.com/32397288/103532074-589aba80-4e69-11eb-9a2f-a4a31799c6a7.png" width="500"> | <img src="https://user-images.githubusercontent.com/32397288/103532105-65b7a980-4e69-11eb-875d-d0ef364c3c22.png" width="500"> 

### API

Para fazermos o processo de manipulação de uma api usamos **JsonServer**. Para usar no projeto precisamos criar um arquivo chamado server.json e ao dá start na aplicação a api tem que está rodando também.

Adicionando a biblioteca

```jsx
yarn global add json-server
```

Start 

```jsx
npx json-server server.json -p 3333
```

### Tecnologias utilizadas

- [x]  React Js
- [x]  Redux
- [x]  Redux Saga
- [x]  Json Server
- [x]  Reactotron

## O que é o Redux?

- O Redux é uma biblioteca para gerenciamento de estado que segue os princípios da arquitetura flux.
- Redux é um container de estado previsível para aplicações JavaScript.

### **Configuração**

Em nossa aplicação vamos utilizar o redux para controlar todo o processo de adicionar um item ao carrinho, contabilizar quantos itens vamos ter, e até mesmo o total. Quando instalamos o redux vamos disparar um action e ela será responsável por fazer todo os processo. A configuração do processo está descrito abaixo.

### Instalando o Redux

Vamos instalar o redux e pacote de interação entre react e redux.

```jsx
yarn add redux react-redux
```

Após instalar criamos uma pasta store com as configurações redux. Assim:

```jsx
import { createStore } from 'redux';

const store = createStore();
export default store;
```

Mas precisamos ir no **App.js** e importar de dentro do redux um carinha chamado provider. Esse provider deixa disponível o store da aplicação para todo o ambiente.

```jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './pages/components/Header';
import GlobalStyle from './pages/styles/global';
import Routes from './routes';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyle />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
```

- Depois de instalar a biblioteca precisamos criar uma **pasta store** dentro de **src, feito isso foi adicionado um arquivo index.js na raiz.**
- Dentro de store temos uma pasta **modules** e outra para o nosso **cart, dentro de cart adicionamos um arquivo chamado reducer**.
- Para fazer mais de um redux, na pasta do modules, na raiz, criamos um arquivo chamado **rootReducer**.

**Estrutura**:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/24298337-df96-4814-9ab2-f3a1505ccac6/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/24298337-df96-4814-9ab2-f3a1505ccac6/Untitled.png)

**Arquivos**:

- **Store/index**

```jsx
import { createStore } from 'redux';
import rootReducer from './modules/rootReducer';

const store = createStore(rootReducer);
export default store;
```

- **modules/rootReducer**

    Esse arquivo foi criado com o intuito de se em algum momento desejamos criar outros reducer, para adicionar basta import a pasta e adiciona ao comando de **combineReducers**.

```jsx
import { combineReducers } from 'redux';

import cart from './cart/reducer';

export default combineReducers({
  cart,
});
```

- **cart/reducer.js**

```jsx
export default function cart() {
  
}
```

### Adicionando ao carrinho

- No nosso projeto, tudo partiu da nossa página **Home.**
    - Primeiro importamos connect para que a conexão fosse estabelecida com redux.
        - Assim:

        ```jsx
        import { connect } from 'react-redux';
        ```

    - Feito isso, removemos o export default do inicio da classe e colocamos no rodapé da aplicação a configuração de conexão. Assim:

    ```jsx
    export default connect()(Home);
    ```

    - Assim que realizamos a conexão, temos acesso a propriedade chamada **dispatch. Esse dispatch e responsável por disparar as actions** (responsável por dizer ao redux que quero alterar algo) **do redux.**

    ```jsx
    handleAddProduct = (product) => {
        const { dispatch } = this.props;
        dispatch({
          type: 'ADD_TO_CART',
          product,
        });
      };
    ```

    - Dentro do reducer criamos um switch com um case para ele ouvir apenas a minha **action.**
        - **Primeiro iniciamos um state vazio.**
        - **Recebe a action**
        - Pegamos o produto e colocamos dentro do array.

        ```jsx
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
        ```

        Após configurar a home, vamos na nossa pasta header e fazer o mesmo processo.

        - Primeiro adicionar o connect

        ```jsx
        import { connect } from 'react-redux';
        ```

        - exportar no rodapé, nesse caso podemos passar parâmetros.

        ```jsx
        export default connect((state) => ({
          cartSize: state.cart.length,
        }))(Header);
        ```

        - Nosso arquivo fica assim:

        ```jsx
        import React from 'react';
        import { Link } from 'react-router-dom';
        import { connect } from 'react-redux';

        import { MdShoppingBasket } from 'react-icons/md';

        import { Container, Cart } from './styles';
        import logo from '../../assets/images/logo.svg';

        // eslint-disable-next-line react/prop-types
        function Header({ cartSize }) {
          return (
            <Container>
              <Link to="/">
                <img src={logo} alt="Rocketshoes" />
              </Link>
              <Cart to="/cart">
                <div>
                  <strong>Meu carrinho</strong>
                  <span>{cartSize} itens</span>
                </div>
                <MdShoppingBasket size={36} color="#fff" />
              </Cart>
            </Container>
          );
        }

        export default connect((state) => ({
          cartSize: state.cart.length,
        }))(Header);
        ```

        ## Reactotron +  Redux

        Iniciando com a instalação das bibliotes.

        ```jsx
        yarn add reactotron-react-js reactotron-redux
        ```

        - Depois disso temos que criar uma pasta de configuração na dentro do nosso **src**.
            - **config/ReactotronConfig.js**

            ```jsx
            import Reactotron from 'reactotron-react-js';

            import { reactotronRedux } from 'reactotron-redux';

            if (process.env.NODE_ENV === 'development') {
              const tron = Reactotron.configure({ host: '192.168.1.148' })
                .use(reactotronRedux())
                .connect();
              tron.clear();
              console.tron = tron;
            }
            ```

            - No nosso **app.js** precisamos importar o nosso arquivo de configuração.

            ```jsx
            import React from 'react';
            import { BrowserRouter } from 'react-router-dom';
            import { Provider } from 'react-redux';

            import './config/ReactotronConfig';

            import Header from './components/Header';
            import GlobalStyle from './pages/styles/global';
            import Routes from './routes';

            import store from './store';

            function App() {
              return (
                <Provider store={store}>
                  <BrowserRouter>
                    <Header />
                    <Routes />
                    <GlobalStyle />
                  </BrowserRouter>
                </Provider>
              );
            }

            export default App;
            ```

            Mesmo assim precisamos fazer a conexão entre reactotron e redux. Para isso na pasta **store/index.js e fizemos as seguintes alterações.**

            ```jsx
            import { createStore } from 'redux';
            import rootReducer from './modules/rootReducer';

            const enhancer =
              process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;

            const store = createStore(rootReducer, enhancer);
            export default store;
            ```

            ### Configurando o Redux-Saga

            **O que é o Redux saga ?**

            O Redux Saga é uma biblioteca que visa tornar os efeitos colaterais do aplicativo (ou seja, coisas assíncronas, como busca de dados e coisas sujas, como acessar o cache do navegador) mais fáceis de gerenciar, mais eficientes de executar, mais fáceis de testar e melhores no tratamento de falhas.

            Redux-saga é um **middleware** redux, o que significa que **esse encadeamento pode ser iniciado, pausado e cancelado a partir do aplicativo principal com ações normais de redux,** ele tem acesso ao estado completo do aplicativo redux e também pode enviar ações redux.

            - Middleware ele intercepta um action.

            **Instalação**

            ```jsx
            yarn add redux-saga
            ```

        Vamos para a pasta ***src/store/cart*** e criar um arquivo chamado sagas.js . No sagas vamos criar a chamada a api.

        ```jsx
        import { call, put, all, takeLatest } from 'redux-saga/effects';

        import api from '../../../services/api';
        import { addToCartSuccess } from './actions';

        // * -> significa um generator ou async
        function* addToCart({ id }) {
          // yield - é o generator do await, nossa chamada a api.
          const response = yield call(api.get, `/products/${id}`);

          // put dispara uma action
          yield put(addToCartSuccess(response.data));
        }
        // ouvindo quando a action for adicionada
        export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
        ```

        Depois disso criamos um arquivo chamado sagas.js na raiz do modules.

        ```jsx
        import { all } from 'redux-saga/effects';

        import cart from './cart/sagas';

        export default function* rootSaga() {
          return yield all([cart]);
        }
        ```

        As nossas **actions** tiverem o nome alterado.

        ```jsx
        export function addToCartRequest(id) {
          return {
            type: '@cart/ADD_REQUEST',
            id,
          };
        }

        export function addToCartSuccess(product) {
          return {
            type: '@cart/ADD_SUCCESS',
            product,
          };
        }
        ```

        Na nossa pagina home a função que é chamada é a request.

        Depois disso precisamos configurar o nosso index para identificar o nosso saga.

        ```jsx
        import { createStore, applyMiddleware, compose } from 'redux';
        import createSagaMiddleware from 'redux-saga';

        import rootReducer from './modules/rootReducer';
        import rootSaga from './modules/rootSaga';

        const sagaMiddleware = createSagaMiddleware();

        const enhancer =
          process.env.NODE_ENV === 'development'
            ? compose(console.tron.createEnhancer(), applyMiddleware(sagaMiddleware))
            : applyMiddleware(sagaMiddleware);

        const store = createStore(rootReducer, enhancer);
        sagaMiddleware.run(rootSaga);
        export default store;
        ```

        ```jsx

        ```
