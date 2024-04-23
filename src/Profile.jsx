import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DogContext } from "./Provider";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    dog,
    fetchDogById,
    dogImage,
    fetchDogImage,
  } = useContext(DogContext);

  useEffect(() => {
    (async () => {
      await fetchDogById(id);
    })();
  }, [id]);

  useEffect(() => {
    fetchDogImage();
  }, [id])

  const presenceStatus = dog ? (dog.present ? 'Present' : 'Not present') : '';

  return (
  <div className="profile-component">
    <div className="buttons-container">
      <button className="go-to-start-button" onClick={() => navigate("/")}>Go to Start</button>
      <button className="edit-button" onClick={() => navigate(`/edit/${id}`)}>Edit</button>
    </div>
    {dog && (
      <div className="profile-details-container">
        <h1 className="profile-heading">{dog.name}'s Profile</h1>
        <div className="presence-info" style={{ color: dog.present ? "green" : "red" }}>
          {presenceStatus}
        </div>
        <div className="profile-card">
          <div className="dog-image-container">
            {dogImage && <img className="dog-image" src={dogImage} alt="Dog" />}
          </div>
        </div>
        <div className="info-and-friends-container">
          <div className="dog-info">
            <p><strong>Name:</strong> {dog.name}</p>
            <p><strong>Nickname:</strong> {dog.nickname}</p>
            <p><strong>Age:</strong> {dog.age}</p>
            <p><strong>Breed:</strong> {dog.breed}</p>
            <p><strong>Info:</strong> {dog.info}</p>
          </div>
          <div className="friends-container">
            <h2 className="friends-heading">Friends:</h2>
            <ul className="friends-list">
              {dog.friends &&
                dog.friends.map((friend) => (
                  <li key={friend._id} className="friend-item">{friend.name}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    )}
  </div>
);

};

export default Profile;