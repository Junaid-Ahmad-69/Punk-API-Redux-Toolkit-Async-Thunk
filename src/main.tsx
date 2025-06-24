import {createRoot} from 'react-dom/client'
import {persistor, store} from '../store/store.ts'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react';
import App from './App.tsx'
import './index.css'

import {BrowserRouter} from "react-router";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
)
