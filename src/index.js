import { createRoot } from 'react-dom/client';
import Sandbox from './Graph';

import './index.css';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Sandbox />);
