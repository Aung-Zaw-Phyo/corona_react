import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NNY6yLUTxip4b30lKF0gPFZP06dlh858wLWsGFheOHLRS7V0Gh23ohLuZrXusfwm3q81sSctzw5dtwE4gJeqxSc005WrKrVUl');


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><Elements stripe={stripePromise}><App /></Elements></Provider>);
