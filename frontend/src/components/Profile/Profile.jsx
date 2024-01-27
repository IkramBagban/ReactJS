import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import useFetch from "../../CustomerHooks/useFetch";
import axios from "axios";
import { API_URL } from "../../utils/var";

const Profile = ({ showProfile, onProfileToggle }) => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    email: "",
  });

  const userId = localStorage.getItem("userId");
  const [user, isLoading] = useFetch(`api/v1/auth/user/${userId}`);

  useEffect(() => {
    if (isLoading) return;
    setProfile({ username: user?.username, email: user.email });
  }, [isLoading]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const isAnyFieldEmpty = Object.values(profile).some((val) => val === "");
      if (isAnyFieldEmpty) {
        console.log("Please fill in all fields.");
        return;
      }
      const response = await axios.patch(`${API_URL}/api/v1/auth/user/${userId}`, {
        username: profile.username,
        email: profile.email,
      });

      console.log('response',response)
      if (response.status === 200) {
        console.log("Profile updated successfully:", response.data);
        setEditMode(false);
      } else {
        console.log("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if(error.response.status === 409){
        alert('Email already in use. Choose another email')
      }
    }
  };

  return (
    <div
      className={
        showProfile
          ? `${styles.profileDetails} ${styles.active}`
          : styles.profileDetails
      }
    >
      <button className={styles.closeButton} onClick={onProfileToggle}>
        Close
      </button>
      {editMode ? (
        <>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            className={styles.input}
          />
          <button className={styles.saveButton} onClick={handleUpdateProfile}>
            Save
          </button>
        </>
      ) : (
        <>
          {isLoading ? (
            <h4>Fetching user name...</h4>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {profile?.username}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <button className={styles.editButton} onClick={handleEditToggle}>
                Edit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
