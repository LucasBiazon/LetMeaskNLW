// App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import NewRoom from "./pages/NewRoom";
import Home from './pages/Home';

import { AuthContextProvider } from './context/AuthContext'

export default function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
    </AuthContextProvider>
    </BrowserRouter>
  );
}
