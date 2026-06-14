const express = require("express")
const cors = require("cors")
const pool = require("./db")

const app = express()
app.use(cors())
app.use(express.json())

const users = []

pool.query("SELECT NOW()", (err, result) => {
    if (err) {
        console.log("an error occurred in database. error: ", err)
    } else {
        console.log("result: ", result.rows)
    }
})

app.post("/signup", async (req, res) => {
    console.log("sign up req: ", req.body)
    const { usernameInput, passwordInput, confirmPasswordInput } = req.body
    const username = usernameInput
    const password = passwordInput
    console.log("username: ", username)

    if (!username.trim() || !password.trim()) {
        return res.status(400).send("username or password is required")
    }

    existingUser = users.find(user => user.username === username)
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "username already exists"
        })
    }

    await pool.query("INSERT INTO users(username, password) VALUES($1, $2)",
        [username, password]
    )

    console.log("user: ", users)

    res.json({
        success: true,
        message: "signed up successfully"
    })
})

app.post("/login", (req, res) => {
    console.log("login req: ", req.body)
    res.json({
        success: true,
        message: "logged in successfully"
    })
})

app.listen(3000)