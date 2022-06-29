
import React from "react";
import {Link} from "react-router-dom"
import "../styles/CardPokemon.css"



const CardPokemon = ({ pokemon, loading }) => {
 
  //recibo por props la lista de pokemones y el estado fetching
  return (
    <>
      {loading ? (
        <h3>cargando...</h3>
      ) : ( //mapeo la lista pokemones 
        pokemon.map((item) => (
          <>
            <div className="col-4 mt-3 mb-2" >
              <div className="card">
                <h3>#{item.id}</h3>
                <img className="card-img-top" src={item.sprites.front_default} alt="" />
                
                  <div className="card-body">
                    <h4 className="card-title mb-2 text-danger">{item.name}</h4>
                    <h5 className="">altura: {item.height}</h5>
                    <h5 className="mb-2">peso: {item.weight}</h5>
                    <Link to={`/view/${item.id}`} className="btn btn-primary mt-2">Ver mas</Link>
                    
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
