import { createRoot } from 'react-dom/client';
// import Sandbox from './Graph';
import Homepage from './views/Homepage';
import store from './store';
import { Provider } from 'react-redux';

import './index.css';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <Homepage />
  </Provider>
);
