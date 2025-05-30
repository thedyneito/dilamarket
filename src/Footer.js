// src/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h3>DILAMARKET</h3>
      <p>+57 3143031947</p>
      <p>contacto@dilamarket.com</p>
      <p>Cúcuta, Colombia</p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>Inicio</li>
        <li>Productos</li>
        <li>Visión</li>
        <li>Blog</li>
      </ul>

      <button>Empezar</button>

      <div>
        <p>Suscríbete a nuestro boletín</p>
        <input type="email" placeholder="Email *" />
        <br />
        <button>Enviar</button>
      </div>

      <p>Síguenos en:</p>
      <p>🔗 🇨🇴 💬</p>

      <p>Política de privacidad</p>
      <p>© 2025 Dilson Jiménez</p>
    </footer>
  );
}

export default Footer;
