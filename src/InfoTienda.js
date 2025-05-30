import React from 'react';

function InfoTienda() {
  return (
    <div className="info-tienda">
      <h2>¿Quiénes somos?</h2>
      <p>
        Somos una tienda virtual comprometida con ofrecer productos de calidad a precios accesibles.
        Nuestro objetivo es brindar una excelente experiencia de compra desde la comodidad de tu hogar.
      </p>

      <h2>Misión</h2>
      <p>
        Satisfacer las necesidades de nuestros clientes con productos variados, atención personalizada
        y un proceso de compra rápido y seguro.
      </p>

      <h2>Visión</h2>
      <p>
        Ser reconocidos como una de las mejores tiendas virtuales en Colombia, destacando por nuestro compromiso
        con la calidad, innovación y servicio al cliente.
      </p>

      <h3>Formulario de contacto</h3>
      <form onSubmit={(e) => { e.preventDefault(); alert('Formulario enviado'); }}>
        <input type="text" placeholder="Nombre" required /><br />
        <input type="email" placeholder="Correo electrónico" required /><br />
        <textarea placeholder="Mensaje" required></textarea><br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default InfoTienda;

