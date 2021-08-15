import React, { useEffect, useState } from "react";
import getUser from "../helper/getUser";

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(setUser);
  }, []);

  return <div>{user.name}</div>;
}

export default Profile;
