import { createRoot } from 'react-dom/client';
// import Sandbox from './Graph';
import Homepage from './views/Homepage';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Homepage />
    </PersistGate>
  </Provider>
);
