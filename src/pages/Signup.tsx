import {useState} from "react"
import { useNavigate } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

function Signup(){
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("")

    const navigate = useNavigate()

    async function handleSignup(){

        if (!usernameInput.trim() || !passwordInput.trim()){
            alert("Fill in all fields.")
            return
        }

        if (confirmPasswordInput !== passwordInput){
            alert("passwords do not match")
            return
        }

        const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usernameInput,
                passwordInput,
                confirmPasswordInput
            })
            }
        )
        const message = await response.json()

        if (message.success){
            console.log("sign up complete. message is: "+message.message)
            navigate("/login")
        }else{
            console.log("an error occurred, message is: ",message.message)
        }

    }

    return <div style = {{display: "flex", alignItems: "center", flexDirection: "column", minHeight: "100vh", justifyContent: "center"}}>
        <div style = {{display: "flex", flexDirection: "column", gap: "2px"}}>

            <input 
                placeholder="Enter username"
                value = {usernameInput}
                onChange= {(e) => {
                    setUsernameInput(e.target.value)
                }}
            />

            <input 
                placeholder = "Enter password"
                value = {passwordInput}
                onChange = {(e) => {
                    setPasswordInput(e.target.value)
                }}
            />

            <input 
                placeholder = "Confirm password"
                value = {confirmPasswordInput}
                onChange = {(e) => {
                    setConfirmPasswordInput(e.target.value)
                }}
            />

            <button
                onClick = {handleSignup}
            >
                submit
            </button>

        </div>
    </div>
}


export default Signup;
