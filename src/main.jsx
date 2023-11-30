import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {AuthenticationProvider} from "./context/AuthenticationContext.jsx";
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import {ScholarProvider} from "./context/ScholarContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
      <BrowserRouter>
          <AuthenticationProvider>
              <ScholarProvider>
                    <CssBaseline />
                    <App />
              </ScholarProvider>
          </AuthenticationProvider>
      </BrowserRouter>
)
