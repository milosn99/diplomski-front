import React from "react";
import ProfessorCard from "./ProfessorCard";
import RecruiterCard from "./RecruiterCard";
import StudentInfo from "./StudentInfo";

function UserInfo(props) {
  switch (props.user.userType) {
    case "student":
      return (
        <div>
          <StudentInfo user={props.user} />
        </div>
      );
    case "professor":
      return (
        <div>
          <ProfessorCard user={props.user} />
        </div>
      );
    case "recruiter":
      return (
        <div>
          <RecruiterCard user={props.user} />
        </div>
      );
    default:
      return <div>{""}</div>;
  }
}

export default UserInfo;
