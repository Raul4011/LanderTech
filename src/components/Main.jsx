import React from "react";
import { useState, useEffect} from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import CardPokemon from "./CardPokemon";
import { Button } from "../styles/Button";
import "../styles/Main.css";
import { useNavigate } from "react-router-dom";


const Main = () => {
  
  let navigate = useNavigate();

  const [pokemones, setPokemones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prevPok, setPrevPoks] = useState();
  const [nextPok, setNextPok] = useState();
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [valorbusqueda, setValorbusqueda] = useState("");

  const handleSearch = async() => {
    let response =await axios.get("https://pokeapi.co/api/v2/pokemon?offset=20&limit=1154")

    if (response){
      let array = []
      for (const item of response.data.results) {
        array.push(item.name)
      }
      console.log(array)
      
      for (let i = 0; i < array.length; i++) {
        if (valorbusqueda===array[i]) {
          alert("es igual")
        }else {
          alert("No No")
        }
        
      }
    }
    //console.log(response.data.results)
   
    
    
   
    

  };

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
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
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
       
            <h1 className="pt-3 text-primary">Pokedex Landertech</h1>
          
        <br />

        <input
          type="text"
          placeholder="ingresa un nombre"
          onChange={(e) => setValorbusqueda(e.target.value)}
        />
        <Button type="button" onClick={handleSearch}>
          search
        </Button>
        <h3>Listado de pokemones</h3>

        <br />
        <Row>
          <CardPokemon pokemon={pokemones} loading={loading} />
        </Row>
        {prevPok && (
          <Button
            onClick={() => {
              setPokemones([]);
              setUrl(prevPok);
            }}
          >
            Previous
          </Button>
        )}
        <Button
          onClick={() => {
            setPokemones([]);
            setUrl(nextPok);
          }}
        >
          Next
        </Button>
      </Container>
    </>
  );
};

export default Main;
