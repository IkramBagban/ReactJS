// // import React from "react";

// // function Profile() {
// //   return (
// //     <div>
// //       <h2>Profile</h2>
// //       <h4>John DOe</h4>
// //       <h4>email@gmail.com</h4>
// //     </div>
// //   );
// // }

// // export default Profile;

// import React, { useState } from "react";
// import styles from "./Profile.module.css";

// const Profile = ({ showProfile, onProfileToggle }) => {
//   console.log("showprofile", showProfile);
//   return (
//     <>
//       <div
//         className={
//           showProfile
//             ? `${styles.profileDetails} ${styles.active}`
//             : styles.profileDetails
//         }
//       >
//         <button className={styles.button} onClick={onProfileToggle}>
//           close
//         </button>
//         <div>
//           <p>Name: John Doe</p>
//           <p>Email: johndoe@example.com</p>
//           <p>Location: New York, USA</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;

import React, { useState } from 'react';
import styles from './Profile.module.css';

const Profile = ({ showProfile, onProfileToggle }) => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    location: 'New York, USA',
  });

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
    console.log('Profile updated:', profile);
  };

  return (
    <div className={showProfile ? `${styles.profileDetails} ${styles.active}` : styles.profileDetails}>
      <button className={styles.closeButton} onClick={onProfileToggle}>Close</button>
      {editMode ? (
        <>
          <input
            type="text"
            name="name"
            value={profile.name}
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
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleInputChange}
            className={styles.input}
          />
          <button className={styles.saveButton} onClick={handleUpdateProfile}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Location:</strong> {profile.location}</p>
          <button className={styles.editButton} onClick={handleEditToggle}>Edit</button>
        </>
      )}
    </div>
  );
};

export default Profile;

