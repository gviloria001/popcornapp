import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInPage from './pages/SignIn';
import UsersPage from './pages/UsersPage';
import DB from './pages/DB';



function App() {
  return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/SignInPage" element={<SignInPage />} />
          <Route path="/UsersPage" element={<UsersPage />} />
          <Route path="/DB" element={<DB />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
