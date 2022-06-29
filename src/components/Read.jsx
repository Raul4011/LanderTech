import React from "react";
import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Read = () => {
  const { id } = useParams();

  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  //console.log(id);

  const getPok = async () => {
    setLoading(true);
    let result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(result.data);
    setDatos((state) => {
      state = [...state, result.data];
      return state;
    });
    console.log(datos);
    setLoading(false);
  };

  useEffect(() => {
    getPok();
  }, [id]);

  return (
    <>
      {loading ? (
        <h3>Cargando ...</h3>
      ) : (
        datos.map((item) => (
          <>
            <div className="container text-center mt-5">
              <div className="card">
                <h2 className="card-title">{item.name}</h2>
                <img
                  className="card-img-top"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${item.id}.png`}
                  alt=""
                />
                <div className="abilities">
                  {item.abilities.map(poke=><>
                  <div className="group">
                    <h3 className="btn btn-danger">{poke.ability.name}</h3>
                  </div>
                  </>)}
                </div>
                <div className="stats">
                    {item.stats.map(poke=><h3>{poke.stat.name} : {poke.base_stat}</h3>)}
                </div>
              </div>
            </div>
          </>
        ))
      )}
    </>
  );
};

export default Read;
