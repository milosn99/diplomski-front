import { Button, IconButton, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

export default function NewPost() {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory();
  const [content, setContent] = useState("");

  const handleUploadClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("thumbnail", selectedFile);
    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    let result = await axios.post(
      "/api/posts/add",
      { content: content },
      config
    );

    config = {
      headers: {
        enctype: "multipart/form-data",
        "x-auth-token": localStorage.getItem("token"),
      },
    };

    result = await axios.put(
      `/api/posts/photo/${result.data._id}`,
      data,
      config
    );

    console.log(result);

    history.push("/");
  };

  return (
    <div>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="content"
        multiline
        maxRows={20}
        label="Enter post content"
        name="content"
        autoComplete="content"
        autoFocus
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        accept="image/*"
        className={classes.input}
        id="thumbnail"
        name="thumbnail"
        type="file"
        onChange={(e) => {
          setSelectedFile(e.target.files[0]);
        }}
      />
      <label htmlFor="thumbnail">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <Button variant="contained" color="primary" onClick={handleUploadClick}>
        Post
      </Button>
    </div>
  );
}
