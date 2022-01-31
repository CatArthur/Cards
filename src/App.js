import './App.css';
import {useEffect, useState} from 'react';
import DogCard from './DogCard'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

function App() {
  const [data, setData]=useState([])
  const [liked, setLiked]=useState([])
  const [filter, setFilter]=useState(false)

  useEffect(()=>{
    fetch('https://api.thedogapi.com/v1/breeds', {method: 'GET', headers:{'x-api-key':'072c32bb-3c40-4bb3-895c-a5455c4c3fd6'}})
    .then((response)=>response.json())
    .then((response)=>setData(response))
    .catch((e)=>console.log(e))

   
    setLiked(JSON.parse(localStorage.getItem('liked') || '[]'))
  }, [])

  useEffect(()=>{
    localStorage.setItem("liked", JSON.stringify(liked));
  }, [liked])

  function like(id){
    if(liked.includes(id)){
      setLiked(liked.filter((item)=>item!==id))
    }
    else{
      setLiked([...liked,id])
    }
  }


  return (
    <div className="App">
      <FormControlLabel
          label="Show only favourites"
          labelPlacement="start"
          control={
            <Switch checked={filter} onChange={()=>setFilter(!filter)}/>
          }
          className="Switch"
        />
      {data.map((item)=>
        (!filter||liked.includes(item.id))&&
          <DogCard dog={item} setLike={()=>like(item.id)} isLiked={liked.includes(item.id)} key={item.id}/>
      )}
    </div>
  );
}

export default App;
