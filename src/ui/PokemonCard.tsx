import React, {useState, useEffect} from 'react'
import { Pokemon } from '../pokemon'

//define props
type Props = {
    pokemon: Pokemon
}

export default function PokemonCard({pokemon} : Props) {
    //mouse hover effect for moves and mouse hover effect for abilities
    const[hide, setHide] = useState(true);
    const[hideAbility, setHideAbility] = useState(true);
    
    return(
        <main className = "flex flex-col border-[#e0ec5c] border-4 bg-blue-400 min-h-[55vh] w-full rounded-xl box-border items-center justify-evenly text-white font-medium">
            <div className = "flex w-4/5 justify-between text-2xl">
                <h1>{pokemon.pokemonName.charAt(0).toUpperCase() + pokemon.pokemonName.slice(1)}</h1>
                <p>{pokemon.hp} hp</p>
            </div>
            <div className = "bg-white w-4/5 h-1/3 flex items-center justify-center">
                <img src = {pokemon.image} alt = "Pokemon Image" width = "200" height = "200"/>
            </div>
            <div className = "flex flex-col w-4/5 justify-start">
                <h1 className = "text-2xl">Moves</h1>
                <div className = "relative w-4/5 flex flex-col justify-between ml-5 mt-3" onMouseEnter = {() => setHide(false)} onMouseLeave={() => setHide(true)}>
                    <p>{pokemon.move1[0]}</p>
                    <p>{pokemon.move2[0]}</p>
                    {!hide && (
                        <div className = "absolute h-32 w-full rounded-xl left-full top-0 mt-2 text-sm bg-purple-400 flex flex-col justify-center items-center p-2">
                            <p className = "mb-1">{pokemon.move1[1]}</p>
                            <p>{pokemon.move2[1]}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className = "relative w-4/5 flex flex-col justify-start ml-5 mt-3"
            onMouseEnter={() => setHideAbility(false)} onMouseLeave={() => setHideAbility(true)}
            >
                <p className="text-2xl">
                    Ability: {pokemon.ability[0] ? pokemon.ability[0].charAt(0).toUpperCase() + pokemon.ability[0].slice(1) : 'N/A'}
                </p>
                {! hideAbility && (
                    <div className = "absolute h-16 w-full rounded-xl left-full top-0 mt-2 text-sm bg-purple-400 flex flex-col justify-center items-center p-2">
                        <p>{pokemon.ability[1]}</p>
                    </div>
                )}
            </div>
        </main>
    );
    
}