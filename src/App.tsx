// App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import NewRoom from "./pages/NewRoom";
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms/new" element={<NewRoom />} />
      </Routes>
    </BrowserRouter>
  );
}
