import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar'
import Home from './components/home'
import AppRouter from './components/AppRouter';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  
  return (
    <div className="App">
      {/* <Navbar/>
      <Home /> */}
       <ToastContainer
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
         
          pauseOnFocusLoss
          draggable
          pauseOnHover
          position='top-center' />
      <Navbar/>
      <AppRouter />
    </div>
  );
}

export default App;
