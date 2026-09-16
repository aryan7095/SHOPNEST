import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';

// Entry point: mounts the React app into the DOM element with id="root"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Redux Provider wraps everything so any component can access cart state via useSelector
  <Provider store={store}>
    {/* AuthProvider wraps the app so all components can access auth state via useContext(AuthContext) */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);
