import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import InfoTienda from './InfoTienda';
import Gracias from './Gracias';
import Footer from './Footer';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  const agregarAlCarrito = (producto) => {
    const existente = carrito.find(item => item.id === producto.id);
    if (existente) {
      const actualizado = carrito.map(item =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setCarrito(actualizado);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const finalizarCompra = async () => {
    try {
      const response = await axios.post('http://localhost:5000/finalizar-compra', {
        carrito,
        usuario_id: 1
      });
      alert(response.data.mensaje);
      setCarrito([]);
    } catch (error) {
      console.error('Error al finalizar compra:', error);
      alert('Error al procesar la compra');
    }
  };

  return (
    <div className="container">
      <InfoTienda />
      <h1>Tienda Virtual</h1>

      <h2>Productos disponibles</h2>
      <ul>
        {productos.length > 0 ? (
          productos.map(producto => (
            <li key={producto.id}>
              {producto.nombre} - ${producto.precio}
              <button onClick={() => agregarAlCarrito(producto)}>
                Añadir al carrito
              </button>
            </li>
          ))
        ) : (
          <li>No hay productos disponibles</li>
        )}
      </ul>

      <h2>Carrito de compras</h2>
      <ul>
        {carrito.map((item, index) => (
          <li key={index}>
            {item.nombre} - ${item.precio} x {item.cantidad}
          </li>
        ))}
      </ul>

      {carrito.length > 0 && (
        <>
          <button onClick={finalizarCompra}>Finalizar Compra</button>
          <div style={{ marginTop: '30px' }}>
            <h2>Pagar con PSE</h2>
            <form
              action="https://sandbox.wompi.co/checkout/"
              method="GET"
            >
              <input
                type="hidden"
                name="public-key"
                value="pub_test_yURbziwKVvBAz7Jrpqa4eRo5IQ0JcIUs"
              />
              <input type="hidden" name="currency" value="COP" />
              <input type="hidden" name="amount-in-cents" value="5000000" />
              <input type="hidden" name="reference" value="PEDIDO_12345" />
              <input
                type="hidden"
                name="redirect-url"
                value="http://localhost:3000/gracias"
              />
              <button type="submit">Pagar con PSE (Wompi)</button>
            </form>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
