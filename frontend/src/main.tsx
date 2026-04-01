import {GoogleOAuthProvider} from '@react-oauth/google';
import {createRoot} from 'react-dom/client'
import {persistor, store} from '../store/store.ts'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter} from "react-router";
import {Loader} from "@/components/Loader";
import {Toaster} from "sonner";
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Loader/>
                    <App/>
                    <Toaster richColors  position="top-right"/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </GoogleOAuthProvider>
)
