import axios from "axios";

const getType = async (setType) => {
  let config = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  const result = await axios.get("/api/me/type", config);
  setType(result.data.userType);
};

export default getType;
