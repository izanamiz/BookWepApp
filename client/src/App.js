import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
import { Provider } from 'react-redux';
import store from './redux/store';
//
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ScrollToTop />
            <Router />
            <ToastContainer />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}
