import { StrictMode } from 'react'; 
import { createRoot } from 'react-dom/client';
import { BrowserRouter} from "react-router-dom";
import './index.css';
import AppRouters from './routes/appRouters.jsx';
import { AuthProvider} from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext.jsx';
import {MessengerProvider} from './context/MessengerContext.jsx'
import App from './App.jsx'


const RootComponent = () => (
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <MessengerProvider>
            <ThemeProvider>
                 <App>
                   <AppRouters />
                 </App>   
            </ThemeProvider>
         </MessengerProvider>   
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

createRoot(document.getElementById('root')).render(<RootComponent />);
