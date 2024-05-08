import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import pokemonLogo from './blackLogo.png';
import SearchBar from './SearchBar';



const MainComponent = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // State variable to track the selected Pokémon
  const [pokemonDetails, setPokemonDetails] = useState(null); // State variable to store details of the selected Pokémon
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
        const data = await response.json();
        setPokemonList(data.results);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // Function to fetch details of the selected Pokémon
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (!selectedPokemon) return; // Do nothing if no Pokémon is selected
      setIsLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`);
        const data = await response.json();
        setPokemonDetails(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [selectedPokemon]);

  // Event handler to handle selection of a Pokémon
  const handlePokemonSelect = (pokemonName) => {
    setSelectedPokemon(pokemonName); // Update the selected Pokémon state variable
  };

  const handleSearch = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      const data = await response.json();
      setPokemonList([data]);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div class='container'>
      <img src={pokemonLogo} alt="Pokemon Logo" />

      <h1 class="flex-container">Search Engine</h1>


      <SearchBar onSearch={handleSearch} />

      <div className="pokemon-details-flex-item">
        {/* Render details of the selected Pokémon */}
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : pokemonDetails ? (
          <div flex-item>
            <h2>{pokemonDetails.name}</h2>
            <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
            <div>
              <strong>Types:</strong> {pokemonDetails.types.map(type => type.type.name).join(', ')}
            </div>
            <div>
              <strong>Abilities:</strong> {pokemonDetails.abilities.map(ability => ability.ability.name).join(', ')}
            </div>
            <div>
              {pokemonDetails.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <strong>{stat.stat.name}:</strong> {stat.base_stat}
           </div>
  ))}
</div>
            
          </div>
        ) : (
          <div>No Pokémon selected</div>
        )}
      </div>

      <div className="pokemon-list-flex-item">
        {/* Render Pokémon cards */}
        {pokemonList.map(pokemon => (
          <PokemonCard 
            key={pokemon.name} 
            name={pokemon.name} 
            isSelected={pokemon.name === selectedPokemon} 
            onSelect={handlePokemonSelect} 
          />
        ))}
      </div>


     
    </div>
  );
};

export default MainComponent;