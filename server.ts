import express from 'express'
const app = express()

const PORT = process.env.PORT || 3000 

app.get("/", (req, res) => {
    res.send("Hello world")
})

const RUNNING_PORT: { [key: number]: string } = {};

app.post("/new", (req, res) => {
    
    const port = (() => {
      for (let i = 8000; i < 8999; i++) {
        if (RUNNING_PORT[i]) continue;
        return `${i}`;
      }
    })();
    
    if (port) {
        RUNNING_PORT[Number(port)] = `hello-${port}`;
    } else {
        res.status(500).send("No available port found");
        return;

        // comment
    }
    
    res.send(`running port:, ${port}`)
    
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))