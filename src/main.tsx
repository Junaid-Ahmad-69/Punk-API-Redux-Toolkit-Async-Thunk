import {createRoot} from 'react-dom/client'
import {store} from '../store/store.ts'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from "redux-persist";
import App from './App.tsx'
import './index.css'
import {Loader} from "lucide-react";
import {BrowserRouter} from "react-router";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={<div><Loader/></div>} persistor={persistStore(store)}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
)
