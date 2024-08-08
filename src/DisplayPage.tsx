import React, { useEffect, useState } from 'react';
import "./App.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PokemonCard from './ui/PokemonCard';
import { Pokemon } from './pokemon';

export default function DisplayPage() {
    //fetch query from url params
    const navigate = useNavigate();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get('query');
    
    //this will be passed into the pokemoncard component
    const [pokemon, setPokemon] = useState<Pokemon>({
        pokemonName: "",
        move1: [],
        move2: [],
        ability: [],
        image: "",
        hp: 0
    });

    //clicking the back button will redirect to hte home page
    const handleClick = (e : any) => {
        navigate(`/`);
        e.preventDefault();
    };

    //handling api calls to get information about pokemon
    useEffect(() => {
        async function getPokemonInfo() {
            try {
                if (query) {
                    const param = query.toLowerCase();
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(param)}`);
                    const pokemon = response.data;

                    // Extracting two moves randomly and ensuring they aren't duplicated
                    let firstMove = Math.floor(Math.random() * pokemon.moves.length);
                    let secondMove = Math.floor(Math.random() * pokemon.moves.length);

                    while(firstMove == secondMove && pokemon.moves.length > 1) {
                        secondMove = Math.floor(Math.random() * pokemon.moves.length);
                    }

                    const move1Info = [];
                    const move2Info = [];
                    const abilityInfo = [];

                    //fetching necessary information
                    let move = pokemon.moves[firstMove].move.name;
                    let moveResult = await axios.get(`https://pokeapi.co/api/v2/move/${encodeURIComponent(move)}`)

                    move1Info.push(move);
                    move1Info.push(moveResult.data.effect_entries[0].short_effect);

                    move = pokemon.moves[secondMove].move.name;
                    moveResult = await axios.get(`https://pokeapi.co/api/v2/move/${encodeURIComponent(move)}`);

                    move2Info.push(move);
                    move2Info.push(moveResult.data.effect_entries[0].short_effect);

                    const abilityName = pokemon.abilities[0].ability.name;
                    const abilityResult = await axios.get(`https://pokeapi.co/api/v2/ability/${encodeURIComponent(abilityName)}`);

                    abilityInfo.push(abilityName);
                    abilityInfo.push(abilityResult.data.effect_entries[1].short_effect);

                    //retrieve attributes from api and assign to pokemon var
                    setPokemon({
                        pokemonName: pokemon.name,
                        move1: move1Info,
                        move2: move2Info,
                        ability: abilityInfo,
                        image: pokemon.sprites.front_default,
                        hp: pokemon.stats[0].base_stat,
                    });
                } else {
                    console.error("Query parameter is missing or null");
                }
            } catch (error) {
                console.error("Error fetching Pokémon info:", error);
            }
        }

        getPokemonInfo();
    }, [query]);

    return (
        <main className = "flex flex-col min-h-screen justify-center items-center gap-14">
            <div className = "h-full w-[35vh]">
                <PokemonCard pokemon = {pokemon}/>
            </div>
            <button type = "submit" onClick = {handleClick} className = "h-10 w-1/12 rounded-xl right-2 top-2 text-sm text-black bg-[#e0ec5c]">
                Back
            </button>
        </main>
    );
}
