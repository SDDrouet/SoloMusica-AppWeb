import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
import { StateProvider } from './context/StateProvider';
import reducer from './context/reducer';
import {initialState} from './context/InitialState';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Router>
            <StateProvider initialState={initialState} reducer={reducer}>
                <App />
            </StateProvider>
        </Router>
    </React.StrictMode>
);
