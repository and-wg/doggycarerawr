import { useState, useEffect } from 'react'
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Profile from './Profile'
import Start from './Start'
import Create from './Create';
import Edit from './Edit'

function App() {
  const [dogs, setDogs] = useState([]);
  const [dog, setDog] = useState(null)
  const [id, setId] = useState('')
  const [dogsChanged, setDogsChanged] = useState(false);

    return (
      <Router>
        <Routes>
          <Route path='/' element={<Start /> } />
          <Route path='/create' element={<Create />}/>
          <Route path='/profile/:id' element={ <Profile />}/>
          <Route path='/edit/:id' element={ <Edit /> } />
        </Routes>
      </Router>
    )
}

export default App