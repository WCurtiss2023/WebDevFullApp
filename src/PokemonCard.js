import React, { useState, useEffect } from 'react';

const PokemonCard = ({ name, isSelected, onSelect }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (!isSelected) return; // Do nothing if the card is not selected
      setIsLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        setPokemonDetails(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name, isSelected]);

  return (
    <div className={`pokemon-card ${isSelected ? 'selected' : ''}`} onClick={() => onSelect(name)}>
      <h2>{name}</h2>
      {/* Display image and details only if the card is selected */}
      {isSelected && (
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div>
              <img src={pokemonDetails.sprites.front_default} alt={name} />
              <div>
                <strong>Types:</strong> {pokemonDetails.types.map(type => type.type.name).join(', ')}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
