require("dotenv").config()

const express = require("express")
const cors = require("cors")
const pool = require("./db")
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET
console.log(JWT_SECRET)

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
    try {
        const { usernameInput, passwordInput, confirmPasswordInput } = req.body
        const username = usernameInput
        const password = passwordInput

        if (!username.trim() || !password.trim()) {
            return res.status(400).send("username or password is required")
        }

        await pool.query("INSERT INTO users(username, password) VALUES($1, $2)",
            [username, password]
        )

        console.log("user: ", users)

        res.json({
            success: true,
            message: "signed up successfully"
        })

    } catch (error) {
        console.log("an error occurred: ", error)
        if (error.code === "23505") {
            return res.status(400).json({
                success: false,
                message: "username already exists"
            })
        }
        res.status(400).json({
            success: false,
            message: "server error"
        })

    }


})

app.post("/login", async (req, res) => {
    console.log("login req: ", req.body)
    const username = req.body.usernameInput;
    const password = req.body.passwordInput;

    if (!username.trim() || !password.trim()) {
        return res.status(400).json({
            success: false,
            message: "username or password is required"
        })
    }

    const databaseResult = await pool.query("SELECT * FROM users where username = $1",
        [username]
    )

    //console.log("result: ", databaseResult.rows[0])

    if (databaseResult.rows.length === 0) {
        return res.status(400).json({
            success: false,
            message: "username not found"
        })
    }

    if (databaseResult.rows[0].password !== password) {
        return res.status(400).json({
            success: false,
            message: "password not found"
        })
    }

    const token = jwt.sign(
        {
            userID: databaseResult.rows[0].id,
            username: databaseResult.rows[0].username
        },
        JWT_SECRET
    )


    res.json({
        success: true,
        token: token,
    })
})

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            success: false
        })
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(token, JWT_SECRET)

    req.user = decoded

    next()
}

app.post("/todos", authenticate, async (req, res) => {
    console.log("in post todos: ", req.user)
    const text = req.body.text
    const result = await pool.query("INSERT INTO todos(text, user_id) VALUES($1, $2) RETURNING *", [text, req.user.userID])

    res.json({
        success: true,
        data: result.rows[0]
    })

})

app.put("/todos/:id", authenticate, async (req, res) => {
    console.log("put: ", req.body)
    const query = `UPDATE todos 
                    SET text = $1, completed = $2
                    WHERE id = $3
                    AND user_id = $4`
    const result = await pool.query(query, 
        [req.body.todoItem.text, req.body.todoItem.completed, req.params.id, req.body.todoItem.user_id])

    res.json({
        success: true,
    })

})

app.get("/me", authenticate, async (req, res) => {
    const result = await pool.query("SELECT username FROM users WHERE id = $1",[req.user.userID])

    res.json({
        success: true,
        username: result.rows[0].username
    })
})

app.get("/todos", authenticate, async (req, res) => {

    const result = await pool.query("SELECT * FROM todos WHERE user_id = $1 ORDER BY id ASC", [req.user.userID])

    console.log("result rows: ", result.rows)

    res.json({
        success: true,
        data: result.rows
    })

})

app.delete("/todos/:id", authenticate, async (req, res) => {

    const result = await pool.query("DELETE FROM todos WHERE user_id = $1 AND id = $2",[req.user.userID, req.params.id])
    res.json({
        success: true,
    })

})

app.listen(process.env.PORT)



