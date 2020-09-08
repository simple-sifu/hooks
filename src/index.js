import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function APIList({url}){

  if (url.contains("swapi")){
    const scharArray = useFetchAPI(SWAPI_API);
    console.log(`scharArray =, ${JSON.stringify(scharArray)}`)
    return scharArray
  }else{
    const pCharArray = useFetchAPI(POKEMON_API)
    console.log(`pcharArray =, ${JSON.stringify(pcharArray)}`)
    return pCharArray
  }

}

function Display() {
    const SWAPI_API = "https://swapi.py4e.com/api/people/";
    const POKEMON_API = "https://pokeapi.co/api/v2/pokemon/";

    return (
        <div className="">
            <div className="header">
              <h1> Advance Local - React Version </h1>
            </div>

        <div class="container">
            <div class="column">
              <div class="column-headers">
                <h2>Star Wars Characters</h2>
              </div>
              <APIList url={SWAPI_API}/>

            </div>
            <div class="column">
                <div class="column-headers">
                  <h2>Pokemon Characters</h2>
                </div>
                <APIList url={POKEMON_API}/>
            </div>
        </div>

      </div>
    );
}

function useFetchAPI(url){
  
  const [characterSWList, setCharacterSWList] = useState([]);
  const [characterPKList, setCharacterPKList] = useState([]);
  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const characterList = parseAPI(data);
        if (url.contains("swapi")){
          setCharacterSWList(characterList);
          return characterSWList;
        }else{
          setCharacterPKList(characterList);
          return characterPKList;
        }
    });
  });

}

function parseAPI(data){
  
  // limit to 5 characters per column
  const dataList = data.results.slice(0,5);
  return dataList.forEach( currCharacter => {
     const character = createCharacter(currCharacter);
     acc.push(character)        
  },[])

}


// populate li using character properties 
function createCharacter(character){

  const imageURL = {
    "Luke Skywalker": "https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png",
    "C-3PO": "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/C-3PO_droid.png/220px-C-3PO_droid.png",
    "R2-D2": "https://upload.wikimedia.org/wikipedia/en/3/39/R2-D2_Droid.png",
    "Darth Vader": "https://upload.wikimedia.org/wikipedia/en/7/76/Darth_Vader.jpg",
    "Leia Organa": "https://upload.wikimedia.org/wikipedia/en/1/1b/Princess_Leia%27s_characteristic_hairstyle.jpg",
    "bulbasaur": "https://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png",
    "ivysaur": "https://cdn.bulbagarden.net/upload/7/73/002Ivysaur.png",
    "venusaur": "https://img.pokemondb.net/artwork/large/venusaur.jpg",
    "charmander": "https://upload.wikimedia.org/wikipedia/en/a/a5/Pok%C3%A9mon_Charmander_art.png",
    "charmeleon":"https://img.pokemondb.net/artwork/large/charmeleon.jpg"
  }
      
  // limit to display only 8 character properties.
  const characterKeys = Object.keys(character).slice(0,8)
  
  return characterKeys.reduce((acc, currKey) =>{

      // let currVal = character[currKey];
      // if (currKey === "name"){
      //     acc.push(<h2>{currVal}</h2>);
      //     acc.push(<img src={imageURL[currVal]} id={currVal} alt={currVal}></img>)
      // }else{
      //     acc.push(<div>{`${currKey}: ${currVal}`}</div>);
      // }
      acc[currKey] = character[currKey];
      return acc;

  }, {})

}



ReactDOM.render(
    <Display />,
  document.getElementById('root')
);
