import React from 'react';

import Platillo from './platillo';
import Chef from './chef';
import Mesero from './mesero';
import Encargado from './encargado';
import Restaurante from './restaurante';

export default function App() {
  return (
    <div className="container">
      <div className="header">
        <h3>
          Proyecto CRUD 
        </h3>
      </div>

      <Platillo/>
      <Chef/>
      <Mesero/>
      <Encargado/>
      <Restaurante/>
    </div>
  );
}