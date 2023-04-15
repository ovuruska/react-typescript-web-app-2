import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './store/store';
import { Provider as InversionProvider } from 'inversify-react';
import { getContainer } from '@utils/inversion-container';
import { FirebaseProvider } from '@hooks/firebase-context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<InversionProvider
  container={getContainer()}>
  <FirebaseProvider>

    <Provider store={store}>
      <App />
    </Provider>
  </FirebaseProvider>

</InversionProvider>);
