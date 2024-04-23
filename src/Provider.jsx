import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const DogContext = createContext();

function DogProvider({ children }) {
    const [dog, setDog] = useState(null);
    const [allDogsPresent, setAllDogsPresent] = useState(false);
    const [friends, setFriends] = useState([]);
    const [dogImage, setDogImage] = useState('');
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        fetchAllDogs();
    }, []);

    async function fetchAllDogs() {
        try {
            const response = await axios.get('http://localhost:4000/dogs');
            setDogs(response.data);
            setFriends(response.data);
            setAllDogsPresent(response.data.length > 0);
            return response.data;
        } catch (error) {
            console.error('Error fetching dogs:', error);
            return null;
        }
    }
    
    const fetchDogById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:4000/dogs/${id}`);
            setDog(response.data); 
            return response.data;
        } catch (error) {
            console.error('Error fetching dog by id: ', error);
            return null;
        }
    }

    useEffect(() => {
        setAllDogsPresent(friends.length > 0);
    }, [friends]);

    const fetchDogImage = async () => {
        try {
            const response = await axios.get('https://dog.ceo/api/breeds/image/random');
            setDogImage(response.data.message); // Sätt URL:n för den slumpmässiga hundbilden
        } catch (error) {
            console.error('Error fetching dog image:', error);
        }
    };

    useEffect(() => {
        fetchDogImage();
    }, []);

    async function removeDog(idToRemove) {
        try {
            const response = await axios.delete(`http://localhost:4000/dogs/${idToRemove}`);
            if (response.status === 200) {
                setDogs(dogs.filter(dog => dog._id !== idToRemove));
                alert('Dog removed successfully!');
            } else {
                alert('Failed to remove dog.');
            }
        } catch (error) {
            console.error('Error removing dog:', error);
            alert('Failed to remove dog.');
        }
    }

    async function addDogProfile(newDogData) {
        try {
            const response = await axios.post("http://localhost:4000/dogs/addDogProfile", newDogData);
            if (response.status === 201) {
                console.log("Dog profile created successfully!");
                setDogs(prevDogs => [...prevDogs, response.data]);
                setFriends(prevFriends => [...prevFriends, response.data]);
                return true; 
            } else {
                console.error("Failed to create dog profile.");
                return false; 
            }
        } catch (error) {
            console.error("Error creating dog profile:", error);
            return false; 
        }
    }
    
    async function updateDogProfile(id, updateData) {
        try {
            const response = await axios.put(`http://localhost:4000/dogs/edit/${id}`, updateData);
            if (response.status === 200) {
                setDogs(response.data);
                return true;
            } else {
                alert('Failed to update the dog profile');
                return false;
            }
        } catch (err) {
            console.error('Error updating dog profile', err);
            alert('Failed to update the dog profile');
            return false;
        }
    }

    return (
        <DogContext.Provider value={{
            dog, 
            dogImage, 
            fetchAllDogs, 
            fetchDogById, 
            addDogProfile, 
            updateDogProfile, 
            removeDog, 
            fetchDogImage 
        }}>
            {children}
        </DogContext.Provider>
    )
}

export { DogContext, DogProvider };