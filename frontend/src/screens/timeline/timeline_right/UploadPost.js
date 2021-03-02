import React, { useEffect, useState } from "react";
import FormInput from "../../../components/forms/Form";
import axios from "axios";
import Url from "../../../util/Config"

function UploadPost(props) {
  //setting up hooks
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const handleDesChange = (e) => { //changing in description input field
    setDescription(e.target.value);
  };
  ////changing in category input field
  const handleCatChange = (e) => { 
    setCategory(e.target.value);
  };
  //changing in file input field
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  //submitting  new post

  const submit = (e) => { 
    const id = Url.id;               //taking user id from localstorage
    const username = Url.username; //taking username from localstorage
    e.preventDefault();

    //creating new form data

    let form = new FormData();
    var today = new Date();
    var date =                     //take current date
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =                       //take current time
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    form.append("image", image);
    form.append("description", description);
    form.append("category", category);
    form.append("_id", id);
    form.append("username", username);
    form.append("date", date);
    form.append("time", time);

    axios
      .post(`${Url.baseurl}/upload/post`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        props.handlec();
        props.UploadPostField()
      });
  };
  return (
    <div>
      <form>
        <FormInput
          label="Description"
          name="description"
          type="text"
          placeholder="Enter Description"
          onchange={handleDesChange}
        />
        <FormInput
          label="Category"
          name="category"
          type="text"
          placeholder="Enter Category"
          onchange={handleCatChange}
        />
        <input type="file" name="image" onChange={handleFileChange} />
        <input type="submit" onClick={submit}  />
      </form>
    </div>
  );
}

export default UploadPost;
