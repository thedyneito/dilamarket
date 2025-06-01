import React, { useEffect, useState } from 'react';

function App() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Usamos variable de entorno en lugar de URL fija
    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/productos`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }
        return response.json();
      })
      .then(data => setProductos(data))
      .catch(err => {
        console.error('❌ Error:', err.message);
        setError('No se pudieron cargar los productos.');
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🛒 Productos disponibles</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            <strong>{producto.nombre}</strong> - ${producto.precio} - Stock: {producto.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
