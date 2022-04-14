import React from 'react';
import './styles.css'
import { FiSearch } from "react-icons/fi";
export default function Input() {
 return (
<div className='search'>
      <FiSearch color='black' size={25} id='iconSearch' />
      <input type='text' placeholder='Artistas,musicas ou Podcasts' id='search'/>
      </div>
 );
}