import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Signup(){
    const {request} = useContext(AppContext);
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [status, setStatus] = useState(false);
    const [error, setError] = useState({})
    const navigate = useNavigate();

    const validateForm = () => {
        setStatus(name.length > 0 && login.length > 0 && password.length > 0 && password == repeatPassword);
        // const newErrors = {};
        // if(name.trim() === ""){
        //     newErrors.name = "имя обязательное поле"
        // }
        // if (login.trim() === "") {
        //     newErrors.login = "Логін обов'язковий";
        // }

        // if (password === "") {
        //     newErrors.password = "Пароль обов'язковий";
        // } else if (password.length < 6) {
        //     newErrors.password = "Пароль має містити щонайменше 6 символів";
        // }

        // if (repeatPassword === "") {
        //     newErrors.repeatPassword = "Підтвердження пароля обов'язкове";
        // } else if (password !== repeatPassword) {
        //     newErrors.repeatPassword = "Паролі не співпадають";
        // }
        // setErrors(newErrors);
        // return Object.keys(newErrors).length === 0;
    }

    useEffect(validateForm, [name, login, password, repeatPassword])

    const onFormSubmit = e => {
        e.preventDefault();
        console.log("submit")
        const formData = new FormData();
        formData.append("user-name", name);
        formData.append("user-login", login);
        formData.append("user-password", password);
        formData.append("user-repeat", repeatPassword);


        request("/Cosmos/SignUp", {
            method: 'POST',
            body: formData
        }).then(r => r.json())
            .then(j => {
                if (j.status.isOk) {
                    console.log(j.data);
                    navigate("/")
                }
                else {
                    console.error(j);
                }
    });
    }

    return <>
    <h1>Sign up</h1>
     <form onSubmit={onFormSubmit}>
            <div id="form-status" style={{ marginBottom: "15px" }}></div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="name-addon"><i className="bi bi-person-circle"></i></span>
                <input name="user-name" type="text" className="form-control" placeholder="Name" 
                        aria-label="Name" aria-describedby="name-addon"
                        value={name} onChange={e=>setName(e.target.value)}/>

            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="login-addon"><i className="bi bi-person-circle"></i></span>
                <input name="user-login" type="text" className="form-control" placeholder="Login"
                        aria-label="login" aria-describedby="login-addon"
                        value={login} onChange={e=>setLogin(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="password-addon"><i className="bi bi-person-circle"></i></span>
                <input name="user-password" type="text" className="form-control" placeholder="Password"
                        aria-label="Password" aria-describedby="password-addon"
                        value={password} onChange={e=>setPassword(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="repeat-addon"><i className="bi bi-person-circle"></i></span>
                <input name="user-repeat" type="text" className="form-control" placeholder="ConfirmPassword"
                        aria-label="repeat Password" aria-describedby="repeat-addon"
                        value={repeatPassword} onChange={e=>setRepeatPassword(e.target.value)}/>
            </div>
            {status ? 
            <button type="submit" className="btn btn-primary">Реєстрація</button>
            : <button type="button" className="btn btn-secondary">Заполните форму</button>}
              

    </form>
    </>
}