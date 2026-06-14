import {useNavigate} from "react-router-dom"

function Home() {
    const navigate = useNavigate()

    return (
        <div style = {{display: "flex", alignItems: "center", flexDirection: "column", minHeight: "100vh", justifyContent: "center"}}>
            <div style = {{display: "flex", alignItems: "center", flexDirection: "column"}}>
                <h1> Todo App </h1>
                <p> Use the app to keep track of things to do.</p>

                <div>
                    <button
                        onClick = {() => {
                            navigate("/signup")
                        }}
                    >
                        Get started
                    </button>
                    <button
                        onClick = {() => {
                            navigate("/login")
                        }

                        }
                    >
                        Login
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Home;