import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AdminPage from './Pages/AdminPage';
import OrderPage from './Pages/OrderPage';
import Meals from './Components/Meals';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Meals />,
  },
  {
    path: '/admin_page',
    element: <AdminPage />,
  },

  { path: '/orders', element: <OrderPage /> },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
