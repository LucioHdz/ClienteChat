import { useState } from 'react';
import Chat from './components/Chat'
import Contactos from './components/Contactos';
function App() {
  const [contactos,setContactos] = useState()
  return (
    <div className="App">
     <Contactos/>
     <Chat />
    </div>
  );
}

export default App;
