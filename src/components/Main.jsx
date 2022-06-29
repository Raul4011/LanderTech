import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import CardPokemon from "./CardPokemon";
import {Button} from "../styled-components/Button"


const Main = () => {
  const [pokemones, setPokemones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prevPok, setPrevPoks] = useState();
  const [nextPok, setNextPok] = useState();
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

  const handleSearch = () => {};

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    //console.log(res.data.results)
    setPrevPoks(res.data.previous);
    setNextPok(res.data.next);
    getPokemon(res.data.results);
    setLoading(false);
    //console.log(pokemones);
  };

  const getPokemon = async (res) => {
    res.map(async (item) => {
      //console.log(item.url);
      const result = await axios.get(item.url);
      //console.log(result.data)
      setPokemones((state) => {
        state = [...state, result.data];
        state.sort((a,b)=>a.id>b.id?1:-1)
        return state;
      });
    });
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <>
      <Container className="text-center">
        <h1>Bienvenidos a Pokelandia</h1>
        <br />

        <input type="text" placeholder="ingresa un nombre" />
        <Button type="button" onClick={handleSearch}>
          search
        </Button>
        <h3>Listado de pokemones</h3>
        <br />
        <Row>
          <CardPokemon pokemon={pokemones} loading={loading} />
        </Row>
        {prevPok && <Button onClick={()=>{
          setPokemones([])
          setUrl(prevPok)
          
          }}>Previous</Button>}
        <Button onClick={()=>{
          setPokemones([])
          setUrl(nextPok)
          }}>Next</Button>
      </Container>
    </>
  );
};

export default Main;
