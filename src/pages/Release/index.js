import React, {useState,useEffect} from 'react';
import api from '../../api';
import './styles.css'
export default function Release() {
    const [Token, setToken] = useState();
    const [release, setrelease] = useState([]);
    
    useEffect(()=>{
  if(localStorage.getItem('AccessToken')){
    setToken(localStorage.getItem('AccessToken'));
  }
  },[])
  

useEffect(()=>{
  if(Token !== undefined){
    async function GetRecents() {
        let config = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Token
          }
        }
        let release = await api.get('browse/new-releases', config)
       setrelease(release.data.albums.items)
      }   
      GetRecents();
    }
},[Token])

 return (
   <div className='ContainerRelease' >
<header>
<h2>Lançamentos</h2> 
<a href='#'>Ver Tudo</a>
</header>
<div className='containerBox'>
  {release?.map((img, key)=>{
 return (
  <div className='box'  key={key}>
 <img src={`${img.images[1].url}`} id='img'/>
 <div className='info'>
<h3>{img.name}</h3>
<p>{img.release_date}</p>
 </div>
 </div>
 );
  })}
  </div>
</div>
 );
}