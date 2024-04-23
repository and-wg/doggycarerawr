import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { DogContext } from "./Provider";

const Edit = () => {
  const { fetchAllDogs, fetchDogById, updateDogProfile } = useContext(DogContext);
  const [dog, setDog] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [info, setInfo] = useState('');
  const [allDogsPresent, setAllDogsPresent] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [availableFriends, setAvailableFriends] = useState([]);

  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => { 
    async function fetchData() {
      try {
        const fetchedDogs = await fetchAllDogs();
        const fetchedDog = await fetchDogById(id);
        if (fetchedDog) {
          setDog(fetchedDog);
          setName(fetchedDog.name);
          setNickname(fetchedDog.nickname);
          setAge(fetchedDog.age);
          setBreed(fetchedDog.breed);
          setInfo(fetchedDog.info);
          setAllDogsPresent(fetchedDog.present);
          setSelectedFriends(fetchedDog.friends.map(friend => friend._id));
          setAvailableFriends(fetchedDogs.filter(friendDog => friendDog._id !== id));
        }
      } catch (error) {
        console.log("Error: ", error)
      }
    }
  
    fetchData();
  }, [id]);
  
  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedFriends((prevSelectedFriends) => [
        ...prevSelectedFriends,
        value,
      ]);
    } else {
      setSelectedFriends((prevSelectedFriends) =>
        prevSelectedFriends.filter((friendId) => friendId !== value)
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const filteredSelectedFriends = selectedFriends.filter(friendId => friendId !== id);
    console.log('inne i handlesuben')
    try {
      const success = await updateDogProfile(id, {
        name,
        nickname,
        age,
        breed,
        info,
        present: allDogsPresent,
        friends: filteredSelectedFriends
      });

      if (success) {
        alert('Dog profile updated successfully!');
        navigate(`/profile/${id}`)
      } else {
        alert('Failed to update dog profile.');
      }
    } catch (error) {
      console.error('Error updating dog profile:', error);
      alert('Failed to updating dog profile.');
    }
  };

  return (
    <div className="form-card">
      <button onClick={() => navigate(`/profile/${id}`)}>Go Back</button>
      <h2>Edit {name}'s Profile</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
         <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
         <label htmlFor="nickname">Nickname:</label>
         <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
         <label htmlFor="age">Age:</label>
         <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
         <label htmlFor="breed">Breed:</label>
         <input type="text" id="breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
         <label htmlFor="info">Info:</label>
         <input type="text" id="info" value={info} onChange={(e) => setInfo(e.target.value)} />
         <label htmlFor="present">Present:</label>
         <input type="checkbox" id="present" checked={allDogsPresent} onChange={(e) => setAllDogsPresent(e.target.checked)} />

        <fieldset>
          <legend>Select Friends:</legend>
          {availableFriends.map((friendDog) => (
            <div key={friendDog._id}>
              <input
                type="checkbox"
                id={friendDog._id}
                value={friendDog._id}
                checked={selectedFriends.includes(friendDog._id)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={friendDog._id}>{friendDog.name}</label>
            </div>
          ))}
        </fieldset>
        <button type="submit">Update Dog Profile</button>
      </form>
    </div>
  );
};

export default Edit;