import React, {useEffect, useState} from 'react';
import api from '../../api'
import './styles.css'
import {useParams} from 'react-router-dom'
export default function Buscar() {
    const [Token, setToken] = useState();
    const [Nav, setNav] = useState([]);
    const {s} = useParams();


    useEffect(()=>{
    setToken(localStorage.getItem('AccessToken'));
    if(s){
      localStorage.setItem('search', 'true')
    }
  },[])
  
  console.log(Token)


useEffect(()=>{
  if(Token !== undefined){
    async function GetBuscar() {
        let config = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Token
          }
        }
    let search = await api.get('browse/categories', config)
    setNav(search.data.categories.items)

      }   
      GetBuscar();
    }
},[Token])
var colors = ['lightslategray','mediumvioletred','olivedrab','mediumvioletred','goldenrod','midnightblue','mediumvioletred','steelblue','crimson','green']
 return (
<div className='Container'>
<div className='ContainerBuscar'>


<div className='ContainerNav'>
<header>
<h2>Seus gêneros favoritos</h2> 
</header>
<div className='containerBox'>


</div>

</div>

<div className='ContainerNav'>
<header>
<h2>Navegar por todas as seções</h2> 
</header>
<div className='containerBox'>
{Nav?.map((nav, key)=>{
  const random = Math.floor(Math.random() * colors.length );
 return (
  <div className='box' key={key} style={{'backgroundColor':`${colors[random]}`}}>
  <div className='info'>
  <h3>{nav.name}</h3> 
 <p>{nav.release_date}</p>
  </div>
  <img src={`${nav.icons[0].url}`} />
 </div>
 );
  })}
</div>

</div>

</div>
</div>
 );
}