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

const Profile = () => {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    console.log("show profile", showProfile);
  };

  return (
    <>
      <button onClick={toggleProfile}>Profile</button>
      <div
        className={
          showProfile
            ? `${styles.profileDetails} ${styles.active}`
            : styles.profileDetails
        }
      >
        <p>Name: John Doe</p>
        <p>Email: johndoe@example.com</p>
        <p>Location: New York, USA</p>
      </div>
    </>
  );
};

export default Profile;
