import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
// import { RouterProvider } from "react-router";
import "./firebase/foregroundListener.js";

import './index.css'
import App from './App.jsx'
import { router } from './router/router.jsx';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// ✅ Register service worker for Firebase Messaging
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log("Service Worker registered:", registration);
    })
    .catch((err) => {
      console.error("Service Worker registration failed:", err);
    });
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />,
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
