import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; // Import Provider
import store from './store'; // Import the configured store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}> {/* Bọc App trong Provider */}
            <App />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
