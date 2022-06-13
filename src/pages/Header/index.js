import React, { useEffect, useState } from 'react';
import './styles.css'
import Logo from '../../assests/Logo.png'
import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { VscLibrary } from "react-icons/vsc";
import { RiAddBoxLine } from "react-icons/ri";
import { IoIosArrowBack ,  
        IoIosArrowForward , 
        IoMdArrowDropdown ,
        IoMdArrowDropup } from 'react-icons/io'
import api from '../../api'
import Input from './input';


export default function Header() {
  const [Token, setToken] = useState();
  const [RefreshToken, setRefreshToken] = useState();
  const [Me, setMe] = useState([]);
  const [Playlist, setPlaylist] = useState([]);
  const [Photo, setPhoto] = useState([]);
  const [Validate, setValidate] = useState(null);
  const [Arrow, setArrow] = useState(false);

  useEffect(() => {
       
    localStorage.removeItem('search')
    if(!localStorage.getItem('AccessToken')){
      function getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
          hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        if (hashParams?.access_token !== undefined || hashParams?.refresh_token !== undefined) {
          localStorage.setItem('AccessToken', hashParams?.access_token)
          localStorage.setItem('RefreshToken', hashParams?.refresh_token)
         setValidate(true)
        }
        else{
          window.location.href = 'http://192.168.0.104:8888/'
          setValidate(false)
        }
        return hashParams;
      }
      getHashParams();
    }else {
        setToken(localStorage.getItem('AccessToken'))
        setRefreshToken(localStorage.getItem('RefreshToken'))
        setValidate(true)
     }

  }, [])

  useEffect(() => {
    if (Validate == true && Token !== undefined) {
      async function Get() {
        let config = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Token
          }
        }

        let ResMe = await api.get('me', config)
        setMe(ResMe.data)
        let ResPlaylist = await api.get('me/playlists', config)
        setPlaylist(ResPlaylist.data.items)
      }
 
      Get();
    }
  
  }, [Validate])


  useEffect(() => {
    setPhoto(Me.images)
  }, [Me])

  let modal = document.getElementById('modal-conta')
  const GetModal = () => {
    if (modal.style.display == 'none') {
      modal.style.display = 'block'
      setArrow(true)
    } else {
      modal.style.display = 'none'
      setArrow(false)
    }
  }
console.log(Token)
  return (
    <div>
      <div className='Container-menu'>

        {localStorage.getItem('search') ?
           <div className='Arrows'>
            <IoIosArrowBack color='white' size={30} className={'ArrowBox'} />
            <IoIosArrowForward color='white' size={30} className={'ArrowBox'}  />
            <Input />
           </div>
          : <div className='Arrows'>
            <IoIosArrowBack color='white' size={30} className={'ArrowBox'} />
            <IoIosArrowForward color='white' size={30} className={'ArrowBox'}  />
           </div>
          }

        <button id='conta' onClick={GetModal}>{Photo?.map((img, key)=>{ return(<img src={img.url} key={key}/>);})}
        <span >{Me.display_name}
        {Arrow == false ? <IoMdArrowDropdown color='white' size={25} /> : <IoMdArrowDropup color='white' size={25}/>}
        </span></button>
        <ul id='modal-conta'>
          <li><button className='btn'><span>Conta</span></button></li>
          <li><button className='btn'><span>Perfil</span></button></li>
          <li><button className='btn'><span>Sair</span></button></li>
        </ul>
      </div>
      <header id='header'>
       <a href='/'><img src={Logo} id="Logo" /></a>
        <nav>

          <ul id='menu'>
            <li><a href={`/`}><span className='box-link'><MdHomeFilled color='white' size={25} /><span className='TextoLink'>Inicio</span></span></a> </li>
            <li><a href={`/buscar/s`}><span className='box-link'><FiSearch color='white' size={25} /><span className='TextoLink'>Buscar</span></span></a> </li>
            <li><a href='#'><span className='box-link'><VscLibrary color='white' size={25} /><span className='TextoLink'>Sua Biblioteca</span></span></a> </li>
          </ul>

          <ul id='info'>
            <li><a href='#'><span className='box-link'><RiAddBoxLine color='white' size={25} /><span className='TextoLink'>Criar Playlists</span></span></a></li>
            <li><a href='#'><span className='box-link'><img src='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png' id='HeartLike' /><span className='TextoLink'>Musicas Curtidas</span></span></a></li>
          </ul>

          <ul id='Playlists'>
            {Playlist?.map((Playlist, key) => {
              return (
                <li key={key}><a href='#'><span className='TextoLink'>{Playlist.name}</span></a></li>
              );
            })}

          </ul>
        </nav>
      </header>
    </div>
  );
}
