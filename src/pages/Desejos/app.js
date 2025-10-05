import { useState, useEffect } from 'react';
import axios from 'axios';
import './desejos.css';


function Desejos() {
  const [desejos, setDesejos] = useState([]);
  const [item, setItem] = useState('');
  const [link, setLink] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDesejos();
  }, []);

  const fetchDesejos = () => {
    axios.get('http://127.0.0.1:5000/desejos')
      .then(res => setDesejos(res.data))
      .catch(err => console.log(err));
  };

  const saveDesejo = () => {
    if (!item || !link) return;

    if (editId) {
      axios.put(`http://127.0.0.1:5000/desejos/${editId}`, { item, link })
        .then(() => {
          setItem('');
          setLink('');
          setEditId(null);
          fetchDesejos();
        });
    } else {
      axios.post('http://127.0.0.1:5000/desejos', { item, link })
        .then(() => {
          setItem('');
          setLink('');
          fetchDesejos();
        });
    }
  };

  const editDesejo = (d) => {
    setItem(d.item);
    setLink(d.link);
    setEditId(d.id);
  };

  const removeDesejo = (id) => {
    axios.delete(`http://127.0.0.1:5000/desejos/${id}`)
      .then(fetchDesejos);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Desejos</h1>
      <input placeholder="Item" value={item} onChange={e => setItem(e.target.value)} /> <br />
      <input placeholder="Link" value={link} onChange={e => setLink(e.target.value)} /> <br />
      <button onClick={saveDesejo} style={{ marginLeft: '10px' }}>
        {editId ? 'Atualizar' : 'Adicionar'}
      </button>

      <ul>
        {desejos.map(d => (
          <li key={d.id} style={{ marginTop: '10px' }}>
            {d.item} - <a href={d.link} target="_blank" rel="noopener noreferrer">{d.link}</a>
            <button onClick={() => editDesejo(d)} style={{ marginLeft: '10px' }}>Editar</button> 
            <button onClick={() => removeDesejo(d.id)} style={{ marginLeft: '5px' }}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Desejos;
