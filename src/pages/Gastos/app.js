// meu-site\src\pages\Gastos\app.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import './gastos.css';

function Gastos() {
  const [gastos, setGastos] = useState([]);
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchGastos();
  }, []);

  const fetchGastos = () => {
    axios.get('http://127.0.0.1:5000/gastos')
      .then(res => setGastos(res.data))
      .catch(err => console.log(err));
  };

  const saveGasto = () => {
    if (!nome || !valor) return;

    if (editId) {
      // Atualizar gasto existente
      axios.put(`http://127.0.0.1:5000/gastos/${editId}`, { nome, valor: parseFloat(valor) })
        .then(() => {
          setNome('');
          setValor('');
          setEditId(null);
          fetchGastos();
        });
    } else {
      // Adicionar novo gasto
      axios.post('http://127.0.0.1:5000/gastos', { nome, valor: parseFloat(valor) })
        .then(() => {
          setNome('');
          setValor('');
          fetchGastos();
        });
    }
  };

  const editGasto = (gasto) => {
    setNome(gasto.nome);
    setValor(gasto.valor);
    setEditId(gasto.id);
  };

  const removeGasto = (id) => {
    axios.delete(`http://127.0.0.1:5000/gastos/${id}`)
      .then(fetchGastos);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gastos</h1>
      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <input placeholder="Valor" type="number" value={valor} onChange={e => setValor(e.target.value)} />
      <button onClick={saveGasto}>{editId ? 'Atualizar' : 'Adicionar'}</button>
      <ul>
        {gastos.map(g => (
          <li key={g.id}>
            {g.nome} - R${g.valor} 
            <button onClick={() => editGasto(g)} style={{ marginLeft: '10px' }}>Editar</button>
            <button onClick={() => removeGasto(g.id)} style={{ marginLeft: '5px' }}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Gastos;