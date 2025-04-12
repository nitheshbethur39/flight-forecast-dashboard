import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/inter'; // OR
// import '@fontsource/inter/index.css'; if you don’t want variable fonts


createRoot(document.getElementById("root")!).render(<App />);
