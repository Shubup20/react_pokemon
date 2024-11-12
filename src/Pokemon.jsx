import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";
export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const Api = " https://pokeapi.co/api/v2/pokemon?limit=24";
  const fetchPokemon = async () => {
    try {
      const res = await fetch(Api);
      const data = await res.json();
      // console.log(data);

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        // console.log(curPokemon.url);
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        // console.log(data);
        return data;
      });

      // console.log(detailedPokemonData);

      const detailedResponses = await Promise.all(detailedPokemonData);
      console.log(detailedResponses);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  // search functionallty

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>Lets Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name=""
            id=""
          />
        </div>
        <div>
          <ul className="cards">
            {/* {pokemon.map((curPokemon) => { */}
            {searchData.map((curPokemon) => {
              return (
                <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
