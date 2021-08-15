import axios from "axios";

const getUser = (setUser) => {
  let config = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  axios.get("/api/me", config).then((result) => {
    setUser(result.data);
  });
};

export default getUser;
