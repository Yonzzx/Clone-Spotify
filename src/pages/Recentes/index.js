import React, {useState,useEffect} from 'react';
import api from '../../api';
import './styles.css'
export default function Recentes() {
    const [Token, setToken] = useState('');
    const [Recents, setRecents] = useState([]);
    const [ImageRecents, setImageRecents] = useState([]);
    const [Albums, setAlbums] = useState([]);
    
    
    useEffect(()=>{
  if(localStorage.getItem('AccessToken')){
  setToken('BQDQTbvBKUGtCQFC7E0AanvF5hhAHEgmrtIHHhfoSMLoJL7jAbXTIHI6r2sEqugFOyQ0s5-LeAAuPEl-y1qR-NquPzT6tuHl2zOXlKRxNMiAiGCOoswh6TsxaYm4n7tqb9J_gdsy9y61uTa8_sqspXi86Ilbbz56NuRVn4V31PpyqFBlPAPbhjJaUP1nps25a4r2xbjDWJDkxw')
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
        let PlayerRecentes = await api.get('me/player/recently-played', config)
        setRecents(PlayerRecentes.data.items)
    
      }   
      GetRecents();
    }
},[Token])


 return (
   <div className='ContainerRecentes' >
<header>
<h2>Tocado Recentemente</h2> 
<a href='#'>Ver Tudo</a>
</header>
   </div>
 );
}