import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { DogContext } from "./Provider";
import { useContext } from "react";

const Create = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState(0);
  const [breed, setBreed] = useState("");
  const [info, setInfo] = useState("");
  const [allDogsPresent, setAllDogsPresent] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [dogs, setDogs] = useState([])

  const navigate = useNavigate();
  const { addDogProfile, fetchAllDogs } = useContext(DogContext)

  useEffect(() => {
    const getDogs = async () => {
      try {
        const dogsData = await fetchAllDogs();
        setDogs(dogsData);
      } catch (error) {
        console.error("Error fetching dogs", error);
      }
    };
    getDogs();
  }, [fetchAllDogs]);

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
    try {
      const success = await addDogProfile({
        name,
        nickname,
        age,
        breed,
        info,
        present: allDogsPresent,
        friends: selectedFriends,
      });
      if (success) {
        alert("Dog profile created successfully!");
        navigate('/');
      } else {
        alert("Failed to create dog profile.");
      }
    } catch (error) {
      console.error("Error creating dog profile:", error);
      alert("Failed to create dog profile. APAPAP");
    }
  };

  return (
    <div className="form-card">
      <button onClick={() => navigate(`/`)}>Go Back</button>
      <h2>Create Dog Profile</h2>
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
          {dogs.map((friendDog) => (
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
        <button type="submit">Create Dog Profile</button>
      </form>
    </div>
  );

};

export default Create;
