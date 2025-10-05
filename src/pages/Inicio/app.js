// meu-site\src\pages\Inicio\app.js
import { Link } from 'react-router-dom';
import './inicio.css';

export default function Inicio() {
  return (
    <div className="container">
      <h1>Página Inicial</h1>
      <p>Bem-vindo ao meu site!</p>
      <nav>
        <Link to="/gastos">Gastos</Link> | <Link to="/desejos">Desejos</Link>
      </nav>
    </div>
  );
}
