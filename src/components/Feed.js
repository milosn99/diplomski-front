import { makeStyles } from "@material-ui/core";
import React from "react";
import Post from "./Post";

const useStyles = makeStyles((theme) => ({
  feed: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function Feed(props) {
  const classes = useStyles();

  return (
    <div className={classes.feed}>
      {props.data.map((post) => {
        return (
          <Post
            key={post._id}
            data={post}
            user={post.owner}
            currentUser={props.currentUser}
          />
        );
      })}
    </div>
  );
}

export default Feed;
