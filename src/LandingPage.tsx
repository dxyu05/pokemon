import React from 'react';
import "./App.css";
import Search from './ui/Search';

export default function LandingPage() {
    const handleSearch = (query : any) => {
        console.log('Searching for:', query);
        // Implement your search logic here
    };

    return (
        <main className = "flex flex-col min-h-screen justify-center items-center gap-5">
            <div className = "bg-orange-400 h-20 text-white rounded-xl w-1/3 flex justify-center items-center text-5xl">
                <h1>Search for Pokemon!</h1>  
            </div>
            <Search />
        </main>
    );
}

