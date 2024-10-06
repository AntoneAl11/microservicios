import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');  // Usa el puerto 3001 para el servidor de chat

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Verifica la conexión del socket
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    // Recibe mensajes del servidor
    socket.on('chat message', (msg) => {
      console.log('Received message:', msg);  // Verifica la recepción de mensajes
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Limpia el evento al desmontar el componente
    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending message:', message);  // Verifica que se está enviando el mensaje
    socket.emit('chat message', message);
    setMessage('');
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
