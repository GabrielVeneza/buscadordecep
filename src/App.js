import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { motion } from 'framer-motion';


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


  const parent = {
    variantA: { scale: 1 },
    variantB: { scale: 1.25 },
  };
  const chield = {
    variantA: { bottom: 0, right: 0, rotate: 0 },
    variantB: { top: 0, left: 0, rotate: 180 },
  };
  const search = {
    variantA: { laft: 0, rotate : 0 },
    variantB: { right: 0, rotate: 360 },
  }

  return (
    <div className="container">

      {/* <motion.div
        style={{ width: 200, height: 200, backgroundColor: "rgb(255, 255, 255, 0.5)", borderRadius: 30, position: 'relative',}}
        variants={parent}
        initial="variantA"
        whileHover="variantB">

        <motion.div
          style={{ 
            width: 85, 
            height: 85, 
            borderRadius: "20px 20px 30px 20px", 
            backgroundColor: "#fff", 
            position: "absolute", 
            bottom: 0, 
            right: 0 
          }}
          variants={chield}
          transition={{
            type: "spring",
            damping: 4,
            mass: 0.2,
            stiffness: 100,
          }}
        />

      </motion.div>

      <br />
      <br />
      <br /> */}
      <h1 className="title">Buscador de CEP</h1>
      <motion.div className="containerInput"
        variants={parent}
        initial="variantA"
        whileHover="variantB">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variants={parent}
        />

        <motion.button className="buttonSearch" onClick={handleSearch}
          variants={parent}
          initial="variantA"
          whileHover="variantB"

        >
          <FiSearch size={25} color="#FfF" />
        </motion.button>
      </motion.div>

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
