import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DogContext } from "./Provider";

const Start = () => {
  const navigate = useNavigate();
  const { fetchAllDogs, removeDog, } = useContext(DogContext);
  const [dogsState, setDogsState] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDogs = await fetchAllDogs();
        setDogsState(fetchedDogs); 
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };
    fetchData();
  }, [fetchAllDogs]); 


  const handleRemoveDog = async (idToRemove) => {
    if (window.confirm('Are you sure you want to remove this dog?')) {
      await removeDog(idToRemove);
      setDogsState(prevDogs => prevDogs.filter(dog => dog._id !== idToRemove));
      navigate('/');
    }
  };

  return (
    <div className="start-component">
      <button className="create-button" onClick={() => navigate('/create')}>Lägg till hund!</button>
      <div className="dogs-list">
        <h2 className="dogs-list-heading">Hundlistan</h2>
        <ul className="dogs-list-ul">
          {dogsState && dogsState.map((dog) => (
            <li className="dog-item" key={dog._id} onClick={() => { navigate(`/profile/${dog._id}`); }}>
              <div className="dog-item-content">
                <Link className="dog-link" to={`/profile/${dog._id}`} style={{ color: dog.present === true ? "green" : "red" }}>
                  <strong>@</strong> {dog.nickname}
                </Link>
                <button className="remove-button" onClick={() => handleRemoveDog(dog._id)}>X</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default Start;