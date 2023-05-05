import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = () => (
  <ToastContainer
    closeOnClick
    autoClose={2000}
    position="top-center"
    rtl={false}
    theme="dark"
    limit={2}
    newestOnTop={false}
    hideProgressBar
  />
);

export default ToastProvider;
