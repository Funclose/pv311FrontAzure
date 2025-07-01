import { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext"

export default function Auth(){
  const {user, setUser, request} = useContext(AppContext)


  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  

  const atobUtf = (str) => new TextDecoder().decode(Uint8Array.from(atob(str.replace(/\-/g, '+').replace(/\_/g, '/')), c => c.charCodeAt(0)));
  const btoaUtf = (str) => btoa(String.fromCharCode(...new TextEncoder().encode(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');



  const signInClick = () =>{
  const credentials = btoaUtf(login + ':' + password);
  console.log(login, password, credentials);
  // fetch("https://firstpmo3.azurewebsites.net/Cosmos/SignIn", {
  request("/Cosmos/SignIn", {
    headers: {
        'Authorization': 'Basic ' + credentials
    }
  }).then(data => {
            setUser({
              "token": data,
              "name": JSON.parse(atobUtf(data.split('.')[1])).nam
            });
    }).catch(_ => setUser(null));
  }

  const authBlock = () => <>
      <span>Login:</span><input value={login} onChange={e => setLogin(e.target.value)} />
      <br />
      <span>Password:</span><input type='password' value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={signInClick}>Sign in</button>
    </>
  return <>
  {!user ? authBlock(): <>
    <span>Hello, {user.name}</span>
    <br />
    <button onClick={() => setUser(null)}>Sign Out</button>
      </>}
   </>
}
