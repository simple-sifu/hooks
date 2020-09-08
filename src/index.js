import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function APIList(){


}

function Display() {

   
  const characterSWLIST = useFetchAPI("SW");
  const characterPKLIST = useFetchAPI("PK");


    return (
        <div className="">
            <div className="header">
              <h1> Advance Local - React Version </h1>
            </div>

        <div className="container">
            <div className="column">
              <div className="column-headers">
                <h2>Star Wars Characters</h2>
              </div>


            </div>
            <div className="column">
                <div className="column-headers">
                  <h2>Pokemon Characters</h2>
                </div>
            </div>
        </div>

      </div>
    );
}

function useFetchAPI(key){

  const SWAPI_API = "https://swapi.py4e.com/api/people/";
  const POKEMON_API = "https://pokeapi.co/api/v2/pokemon/";

  const [characterSWList, setCharacterSWList] = useState([]);
  const [characterPKList, setCharacterPKList] = useState([]);
  
  let url = key === "SW" ? SWAPI_API : POKEMON_API;
  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const characterList = parseAPI(data);
       
        if (key === "SW"){
          setCharacterSWList(characterList);
          console.log(`characterSWList - ${JSON.stringify(characterList)}`)
          return characterSWList;
        }else{
          setCharacterPKList(characterList);
          console.log(`characterPKList - ${JSON.stringify(characterList)}`)
          return characterPKList;
        }

    });
  },[]);

}

function parseAPI(data){
  
  // limit to 5 characters per column
  const dataList = data.results.slice(0,5);
  return dataList.reduce( (acc,currCharacter) => {
     const character = createCharacter(currCharacter);
     acc.push(character);
     return acc;       
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
