import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ProfileView() {
  const location = useLocation()
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
    if(location.pathname == '/profile'){
      profileInfo()
    }
  }, [location.pathname])
  return <>
    <h1>HEllo {username}</h1>
    <p>email: {email}</p>
  </>
}
export default ProfileView;
