import axios from "axios";

const getType = (setType) => {
  let config = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  axios.get("/api/me/type", config).then((result) => {
    setType(result.data.userType);
  });
};

export default getType;
