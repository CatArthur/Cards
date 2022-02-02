import './App.css';
import {useEffect, useState} from 'react';
import DogCard from './DogCard'
import Switch from '@mui/material/Switch';
import CachedIcon from '@mui/icons-material/Cached';
import FormControlLabel from '@mui/material/FormControlLabel';

const AppWidth=345;

function App() {
  const [data, setData]=useState([])
  const [liked, setLiked]=useState([])
  const [deleted, setDeleted]=useState([])
  const [filter, setFilter]=useState(false)

  useEffect(()=>{
    setData(JSON.parse(localStorage.getItem('data') || '[]'))
    if(data.length==0){
      fetch('https://api.thedogapi.com/v1/breeds', {method: 'GET', headers:{'x-api-key':'072c32bb-3c40-4bb3-895c-a5455c4c3fd6'}})
      .then((response)=>response.json())
      .then((response)=>setData(response))
      .catch((e)=>console.log(e))
    }   
    setDeleted(JSON.parse(localStorage.getItem('deleted') || '[]'))
    setLiked(JSON.parse(localStorage.getItem('liked') || '[]'))
  }, [])

  useEffect(()=>{
    localStorage.setItem("liked", JSON.stringify(liked));
  }, [liked])

  useEffect(()=>{
    localStorage.setItem("deleted", JSON.stringify(deleted));
  }, [deleted])

  function likeCard(id){
    if(liked.includes(id)){
      setLiked(liked.filter((item)=>item!==id))
    }
    else{
      setLiked([...liked,id])
    }
  }

  function deleteCard(id){
    setDeleted([...deleted,id])
    setLiked(liked.filter((item)=>item!==id))
  }

  function refreshData(){
    fetch('https://api.thedogapi.com/v1/breeds', {method: 'GET', headers:{'x-api-key':'072c32bb-3c40-4bb3-895c-a5455c4c3fd6'}})
      .then((response)=>response.json())
      .then((response)=>setData(response))
      .catch((e)=>console.log(e))
    setDeleted([])
  }


  return (
    <div className="App">
      <div className='Header' style={{width:AppWidth}}>
        <FormControlLabel
          label="Show only favourites"
          labelPlacement="start"
          control={
            <Switch checked={filter} onChange={()=>setFilter(!filter)}/>
          }
          className="Switch"
        />
        <CachedIcon className='Refresh' fontSize='large' onClick={refreshData}/>
      {(filter&&liked.length==0)&&
        <p className='Message'>You haven't liked any card yet.</p>
      }
      {(deleted.length==data.length)&&
        <p className='Message'>
          You have dleted all cards already. Use <CachedIcon fontSize='small' color='disable'/> to refresh data.
        </p>
      }
      </div>
      {data.map((item)=>
        !deleted.includes(item.id)&&(!filter||liked.includes(item.id))&&
          <DogCard dog={item} key={item.id} width={AppWidth}
          setLike={()=>likeCard(item.id)} isLiked={liked.includes(item.id)} 
          deleteCard={()=>deleteCard(item.id)}/>
      )}
    </div>
  );
}

export default App;
