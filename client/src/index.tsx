import { createRoot } from 'react-dom/client';
import './styles/globals.css';

import App from './components/App'

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);