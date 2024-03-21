import '@unocss/reset/tailwind.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'virtual:uno.css';

import App from './App';
import { DialogProvider } from './contexts/dialog-context';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DialogProvider>
      <App />
    </DialogProvider>
  </React.StrictMode>,
);
