import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { store } from './store/store'
import 'bootstrap/dist/css/bootstrap.min.css'

// If deploying to GitHub Pages under a repo named `pokedex`, set basename to '/pokedex'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter basename={import.meta.env.BASE_URL}> */}
      <BrowserRouter basename="/pokedex">
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)