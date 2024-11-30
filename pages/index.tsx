"use client";

import pokedex from '../public/assets/pokedex.png';
import Image from 'next/image';
import { useState, useEffect } from "react";

export default function Home() {
  type Pokemon = {
    id: number;
    name: string;
    sprites: {
      other: {
        "official-artwork": {
          front_default: string;
        };
      };
    };
    weight: number;
    height: number;
    base_experience: number;
  };

  // Atualização dos estados
  const [nome, setNome] = useState<string>('');
  const [dadosNome, setDadosNome] = useState<Pokemon | null>(null);
  const [id, setId] = useState<number>(1);
  const [dados, setDados] = useState<Pokemon | null>(null);

  // Função para carregar dados do Pokémon com base no ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const res = await req.json();
        setDados(res);
        setDadosNome(null);
      } catch (error) {
        console.log("Erro ao retornar os dados: " + error);
      }
    };
    fetchData();
  }, [id]);

  // Função para navegar para o próximo Pokémon
  const proximo = () => {
    setId(id + 1);
  };

  // Função para navegar para o Pokémon anterior
  const anterior = () => {
    if (id >= 1) {
      setId(id - 1);
    }
  };

  // Função para carregar dados com base no nome do Pokémon
  useEffect(() => {
    const fetchDadosNome = async () => {
      if (nome.trim() === '') {
        setDadosNome(null);
        return;
      }
      try {
        const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`);
        const res = await req.json();
        
        if (res && res.name) {
          setDadosNome(res);
        } else {
          setDadosNome(null);
        }
      } catch (error) {
        console.log("Erro ao carregar os dados: " + error);
        setDadosNome(null);
      }
    };
    fetchDadosNome();
  }, [nome]);

  // Função para atualizar o nome do Pokémon
  const mudarInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  return (
    <div>
      <main className="flex flex-col">
        <Image src={pokedex} alt="pokedex" className="flex justify-center self-center bg-cover" width={850} />

        {dadosNome ? (
          <ul className="flex justify-center flex-col items-center">
            <li className="absolute mt-[-53%] left-[64.2%]">Id: {dadosNome.id}</li>
            <li className="absolute mt-[-50%] left-[61%]">Nome: {dadosNome.name}</li>
            <li className="absolute mt-[-46%] left-[62%]">Peso: {dadosNome.weight / 10} Kg</li>
            <li className="absolute mt-[-42%] left-[62%]">Altura: {dadosNome.height / 10}0 m</li>
            <li className="absolute mt-[-38%] left-[60%]">Expereiência base: {dadosNome.base_experience}</li>
            <li>
              <Image
                src={dadosNome.sprites.other["official-artwork"].front_default}
                alt={dadosNome.name}
                className="relative mt-[-232%] right-[190px]"
                width={190}
                height={190}
                priority
              />
            </li>
          </ul>
        ) : dados ? (
          <ul className="flex justify-center flex-col items-center">
            <li className="absolute mt-[-53%] left-[64.2%]">Id: {dados.id}</li>
            <li className="absolute mt-[-50%] left-[61%]">Nome: {dados.name}</li>
            <li className="absolute mt-[-46%] left-[62%]">Peso: {dados.weight / 10} Kg</li>
            <li className="absolute mt-[-42%] left-[62%]">Altura: {dados.height / 10}0 m</li>
            <li className="absolute mt-[-38%] left-[60%]">Expereiência base: {dados.base_experience}</li>
            <li>
              <Image
                src={dados.sprites.other["official-artwork"].front_default}
                alt={dados.name}
                className="relative mt-[-232%] right-[190px]"
                width={190}
                height={190}
                priority
              />
            </li>
          </ul>
        ) : (
          <p>Carregando...</p>
        )}

        <label htmlFor="#" className="absolute mt-[27.5%] left-[58%]">
          Pesquise aqui: <input type="text" placeholder="Digite o pokemon" className="w-36 rounded" onChange={mudarInput} />
        </label>
        <button className="absolute mt-[32.5%] left-[57.7%] w-9 h-8 text-[#FB0607]" onClick={anterior}>.</button>
        <button className="absolute mt-[32.5%] left-[60.5%] w-8 h-8 text-[#FB0607]" onClick={proximo}>.</button>
      </main>
    </div>
  );
}
