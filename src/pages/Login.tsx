import {useState} from "react"
import { useNavigate } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

function Login() {

    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    const navigate = useNavigate()

    async function handleLogin() {
        if (!usernameInput.trim() || !passwordInput.trim()){
            alert("Fill in all fields.")
            return
        }
        
        const response = await fetch(`${API_URL}/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usernameInput,
                passwordInput,
            })
        })

        const data = await response.json()
        

        if (data.success){
            localStorage.setItem("token", data.token)
            navigate("/todopage")
            console.log("successfully logged in")

        }else{
            console.log("log in not successfull, message: ", data.message)
        }

    }

    return <div style={{ display: "flex", alignItems: "center", flexDirection: "column", minHeight: "100vh", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>

            <input
                placeholder="Enter username"
                value={usernameInput}
                onChange={(e) => {
                    setUsernameInput(e.target.value)
                }}
            />

            <input
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => {
                    setPasswordInput(e.target.value)
                }}
            />

            <button
                onClick={handleLogin}
            >
                submit
            </button>

        </div>
    </div>
}

export default Login;