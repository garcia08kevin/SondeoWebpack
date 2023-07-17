import React from "react";
import { createRoot } from "react-dom/client";
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<BrowserRouter>
    <App />
</BrowserRouter>);