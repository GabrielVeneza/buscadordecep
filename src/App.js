import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import './styles.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});


  async function handleSearch() {
    //http://viacep.com.br/ws/23013090/json/

    if (input === '') {
      alert('Digite um CEP')
      return
    } else if (input.length < 8) {
      alert('Digite um CEP válido')
      return
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
      console.log(response.data)
      console.log(cep)
    } catch {
      alert('Ops, algo deu errado!')
      setInput('');
    }

  }


  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FfF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>DDD: {cep.ddd}</span>
          <span>{cep.localidade} - {cep.uf}</span>

        </main>
      )}
    </div>
  );
}

export default App;
