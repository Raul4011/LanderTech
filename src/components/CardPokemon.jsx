
import React from "react";

import {Link,useNavigate} from "react-router-dom"

const CardPokemon = ({ pokemon, loading }) => {
  let navigate=useNavigate()
  //console.log(pokemon);
  return (
    <>
      {loading ? (
        <h3>cargando...</h3>
      ) : (
        pokemon.map((item) => (
          <>
            <div className="col-4">
              <div className="card">
                <p>#{item.id}</p>
                <img className="card-img-top" src={item.sprites.front_default} alt="" />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">altura: {item.height}</p><br />
                    <p className="card-text">peso: {item.weight}</p>
                    <Link to={`/view/${item.id}`} className="btn btn-primary">Ver mas</Link>
                    
                  </div>
              </div>
            </div>
          </>
        ))
      )}
    </>
  );
};

export default CardPokemon;
