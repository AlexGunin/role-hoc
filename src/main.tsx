import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {UserProvider, AccessProvider} from "./providers";
import {App} from "./app.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

      <UserProvider>
          <AccessProvider>
              <App/>
          </AccessProvider>
      </UserProvider>
  </React.StrictMode>,
)
