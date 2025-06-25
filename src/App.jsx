import { useState } from 'react'

import './App.css'

function App() {
  const [token, setToken] = useState(null)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const signInClick = () =>{
    const credentials = btoa(login + ':' + password);
console.log(login, password, credentials);
fetch("https://firstpmo3.azurewebsites.net/Cosmos/SignIn", {
// fetch("https://localhost:7284/Cosmos/SignIn", {
    headers: {
        'Authorization': 'Basic ' + credentials
    }
}).then(r => r.json())
    .then(j => {
        if (j.status.isOk) {
            console.log(j.data);
            setToken(j.data);
            setName(JSON.parse(atob(j.data.split('.')[1])).nam);
        }
        else {
            console.error(j);
        }
    });
  }

  const authBlock = () => <>
      <span>Login:</span><input value={login} onChange={e => setLogin(e.target.value)} />
      <br />
      <span>Password:</span><input type='password' value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={signInClick}>Sign in</button>
    </>
  return <>
  {!token ? authBlock(): <>
    <span>Hello, {name}</span>
    <br />
    <button onClick={() => setToken(null)}>Sign Out</button>
      </>}
   </>
}

export default App
