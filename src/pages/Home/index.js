import React from 'react';
import Recentes from '../Recentes';
import Release from '../Release';

export default function Home() {
  return (
    <div className='Container'>
      <Recentes />
      <Release />
    </div>
  );
}