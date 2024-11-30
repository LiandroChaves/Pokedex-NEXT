// https://pokeapi.co/docs/v2#pokemon

"use client"

import pokedex from '../public/assets/pokedex.png'
import Image from 'next/image';
import { useState, useEffect } from "react";

export default function Home() {
    type Pokemon = {
      id: number,
      name: string,
      sprites: {
        other: {
          "official-artwork": {
            front_default: string;
          };
        }
      }
      weight: number,
      height: number,
      base_experience: number
    }

    const lista = []

    function carregarLista(){
      var cont = 1
      for (let i = 0; i < 800; i++) {
        var item = `https://pokeapi.co/api/v2/pokemon/${cont}/`
        lista.push(item) ;
        cont++
      }
    }

    const [nome, setNome] = useState<string>('')
    const [dadosNome, setDadosNome] = useState<Pokemon | null>(null)
    const [id, setId] = useState<number>(1)
    const [dados, setDados] = useState<Pokemon | null>(null);

    useEffect(
      () => {
        const fetchData = async () => {
          try{
            let req = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            let res = await req.json();
            setDados(res);
            setDadosNome(null);
          }
          catch(error){
            console.log("Erro ao retornar os dados: " + error);
          }
        };
        fetchData();
      },[id]
    )

    const proximo = () => {
      setId(id + 1);
    }

    const anterior = () => {
      if(id >= 1){
        setId(id - 1);
      }
    }

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
          } 
          else {
            setDadosNome(null);
          }
        }
        catch (error) {
          console.log("Erro ao carregar os dados: " + error);
          setDadosNome(null);
        }
      };
      fetchDadosNome();
    }, [nome]);
    
  
    const mudarInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNome(event.target.value);
    }

    return (
      <div>
        <main className="flex flex-col">
          <Image src={pokedex} alt='pokedex' className='flex justify-center self-center bg-cover' width={850}/>
          {dadosNome ? (
          <ul className="flex justify-center flex-col items-center">
            <li className="absolute mt-[-53%] left-[64.2%]">
              Id: {dadosNome.id}
            </li>
            <li className="absolute mt-[-50%] left-[61%]">
              Nome: {dadosNome.name}
            </li>
            <li className="absolute mt-[-46%] left-[62%]">
              Peso: {dadosNome.weight / 10} Kg
            </li>
            <li className="absolute mt-[-42%] left-[62%]">
              Altura: {dadosNome.height / 10}0 m
            </li>
            <li className="absolute mt-[-38%] left-[60%]">
              Expereiência base: {dadosNome.base_experience}
            </li>
            <li className="">
            <Image 
                src={pokedex} 
                alt='pokedex' 
                className='flex justify-center self-center bg-cover' 
                width={850}
                priority // Adiciona a prioridade de carregamento
              />
            </li> 
          </ul>
          ) : dados ? (
            <ul className="flex justify-center flex-col items-center">
            <li className="absolute mt-[-53%] left-[64.2%]">
              Id: {dados.id}
            </li>
            <li className="absolute mt-[-50%] left-[61%]">
              Nome: {dados.name}
            </li>
            <li className="absolute mt-[-46%] left-[62%]">
              Peso: {dados.weight / 10} Kg
            </li>
            <li className="absolute mt-[-42%] left-[62%]">
            Altura: {dados.height / 10}0 m
            </li>
            <li className="absolute mt-[-38%] left-[60%]">
              Expereiência base: {dados.base_experience}
            </li>
            <li className="">
              <img src={dados.sprites.other["official-artwork"].front_default} alt={dados.name} className='relative mt-[-232%] right-[190px]' width={190}/>
            </li> 
          </ul>
          ): (
            <p>Carregando...</p>
          )}
          <label htmlFor="#" className='absolute mt-[27.5%] left-[58%]'>Pequise aqui: <input type="text" placeholder='Digite o pokemon' className='w-36 rounded' onChange={mudarInput}/></label>
          <button className="absolute mt-[32.5%] left-[57.7%] w-9 h-8 text-[#FB0607] " onClick={anterior}>.</button>
          <button className="absolute mt-[32.5%] left-[60.5%] w-8 h-8 text-[#FB0607] " onClick={proximo}>.</button>
        </main>
      </div>
    );
  }