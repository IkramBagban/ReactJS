import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import useFetch from "../../CustomerHooks/useFetch";

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

  const handleUpdateProfile = () => {
    setEditMode(false);
    console.log("Profile updated:", profile);
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
            name="name"
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
              <p>
                <strong>Location:</strong> {profile.location}
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
