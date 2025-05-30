// src/BotonPago.js
import React from 'react';

const BotonPago = () => {
  const handlePago = () => {
    const checkoutUrl = 'https://sandbox.wompi.co/v1/redirection-checkout';
    const data = {
      public_key: 'pub_test_yURbziwKVvBAz7Jrpqa4eRo5IQ0JcIUs',
      currency: 'COP',
      amount_in_cents: 100000, // 💰 Monto en centavos
      reference: `pedido_${Date.now()}`, // Referencia única
      redirect_url: 'http://localhost:3000/confirmacion' // ✅ Cambia si deseas una URL diferente
    };

    const query = new URLSearchParams(data).toString();
    window.location.href = `${checkoutUrl}?${query}`;
  };

  return (
    <button onClick={handlePago} style={{ marginTop: '20px', background: '#00B6DE' }}>
      Pagar con PSE (Wompi)
    </button>
  );
};

export default BotonPago;
