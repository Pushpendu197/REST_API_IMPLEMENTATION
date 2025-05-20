const express = require('express')
const fs = require('fs')
const users = require('./MOCK_DATA.json')

const app = express()
const PORT = 8000


// middleware--Plugin 
app.use(express.urlencoded({ extended: false }));


//ROUTES 
// ..............................................................................................
app.get('/api/users', (req, res) => {
    return res.json(users)
})
// ...............................................................................................
app.get('/users', (req, res) => {
    /*
    EXAMPLE EG
<ul>
<li>Pushpendu Dey<li>
    */
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
})

// ...............................................USINH ID /PARAMETER..................................................
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id)

    const user = users.find(user => user.id === id)
    return res.json(user)
})


// ...........................................POST REQUEST .......................................................
app.post("/api/users", (req, res) => {
    const body = req.body;
    console.log('Body', body);
    // TODO: ADD new user
    // INSERT THE USER 
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "Success", id: users.length + 1 })
    })
})

// ...........................................PATCH REQUEST (EDIT).......................................................
app.patch("/api/users/:id", (req, res) => {
    // TODO: Edit new user
    return res.json({ status: "pending" });
})

// ...........................................DELETE REQUEST .......................................................
app.delete("/api/users/:id", (req, res) => {
    // TODO: Delete new user
    return res.json({ status: "pending" });
})






app.listen(PORT, () =>
    console.log(`Server Started at PORT:  ${PORT}`)
)