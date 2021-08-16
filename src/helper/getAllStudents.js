import axios from "axios";

const getAllStudents = async (setStudents) => {
  let config = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  let result = await axios.get("/api/students", config);

  setStudents(result.data);
};

export default getAllStudents;
