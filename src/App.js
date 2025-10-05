import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inicio from './pages/Inicio/app.js';
import Gastos from './pages/Gastos/app.js';
import Desejos from './pages/Desejos/app.js';

function App() {
      return ( 
        <Router>
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ margin: '0 10px' }}>Início</Link>
        <Link to="/gastos" style={{ marginRight: '10px' }}>Gastos</Link>
        <Link to="/desejos">Desejos</Link>
        
      </nav>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/gastos" element={<Gastos />} />
        <Route path="/desejos" element={<Desejos />} />
        <Route path="*" element={<Gastos />} /> {/* Rota padrão */}
      </Routes>
    </Router>
    
  );
}

export default App;