import axios from "axios";
import { useState, useEffect } from "react";


function ProfileView() {
  let [username, setUsername] = useState('')     
  let [email, setEmail] = useState('')     

  const profileInfo = () => {
    axios
    .get('account/')
    .then(res => {
      setUsername(res.data.data.username)
      setEmail(res.data.data.email)
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  useEffect(() => {
    profileInfo()
  }, [])
  return <>
    <h1>HEllo {username}</h1>
    <p>email: {email}</p>
  </>
}
export default ProfileView;
