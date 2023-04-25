import React from 'react';
import { createRoot } from 'react-dom/client';
import 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css';
import 'rc-notification/assets/index.css';

import '../styles/vars.css';
import '../styles/index.css';
import '../styles/reset.css';
import '../styles/fonts.css';
import '../styles/notifications.css';

import { App } from './App/App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
