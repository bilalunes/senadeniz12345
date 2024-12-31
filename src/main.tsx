import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { setupInitialAdmin } from './utils/setupAdmin';

setupInitialAdmin();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);