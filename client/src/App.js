
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import SignInPage from './pages/SignIn';
import UsersPage from './pages/UsersPage'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignInPage" element={<SignInPage />} />
          <Route path="/UsersPage" element={<UsersPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
