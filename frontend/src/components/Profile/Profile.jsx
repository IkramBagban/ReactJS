// import React from "react";

// function Profile() {
//   return (
//     <div>
//       <h2>Profile</h2>
//       <h4>John DOe</h4>
//       <h4>email@gmail.com</h4>
//     </div>
//   );
// }

// export default Profile;

import React, { useState } from "react";
import styles from "./Profile.module.css";

const Profile = ({ showProfile, onProfileToggle }) => {
    console.log('showprofile',showProfile)
  return (
    <>
      {/* <button onClick={onProfileToggle}>Profile</button> */}
      <div
        className={
          showProfile
            ? `${styles.profileDetails} ${styles.active}`
            : styles.profileDetails
        }
      >
        <button onClick={onProfileToggle}>close</button>
        <div>
          <p>Name: John Doe</p>
          <p>Email: johndoe@example.com</p>
          <p>Location: New York, USA</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
