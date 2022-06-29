import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import "../styles/read.css";

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
      <Container>
        {loading ? (
          <h3>Cargando ...</h3>
        ) : (
          datos.map((item) => (
            <>
              <div className="container text-center">
                <div className="cardRead">
                  <div className="x align-right">
                    <Link to={"/"} className="btn btn-danger">
                      X
                    </Link>
                  </div>
                  <div className="text-center mt-2 text-primary">
                    <h2 className="card-title">{item.name}</h2>
                  </div>
                  <div className="align-center mb-2">
                    <img
                      className="card-img-top img-fluid"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${item.id}.png`}
                      alt=""
                    />
                  </div>
                  <h3 className="pt-2 pb-2 text-success">Habilidades</h3>
                  <div className="abilities">
                    
                    {item.abilities.map((poke) => (
                      <>
                        <div className="group">
                          <h3 className="btn btn-danger">
                            {poke.ability.name}
                          </h3>
                        </div>
                      </>
                    ))}
                  </div>
                  <h3 className="pt-2 pb-2 text-success">Stats</h3>
                  <div className="stats pb-4 mb-5">
                    {item.stats.map((poke) => (
                      <h3>
                        <span className="text-warning">{poke.stat.name}</span> : {poke.base_stat}
                      </h3>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ))
        )}
      </Container>
    </>
  );
};

export default Read;
