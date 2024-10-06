import express from "express"
import { connection } from "./config/db"
import cors from 'cors'

const app = express()


app.use(cors({
    origin: 'http://localhost:5173'
}))

connection.connect((err)=> {
    if(err) {
        throw new Error('there was an error')
    } else {
        console.log('successfully connected');
    }
})

app.get('/api/src', (_req, res)=> {
    connection.query('SELECT src_json FROM resource', (err, result)=> {
        if(err) {
            res.status(500).json({message: 'There was an error'})
        } else {
            const data = JSON.stringify(result)
            const json = JSON.parse(data)
            res.json(json[0])
        }
    })
})

app.get('/api/planets', (_req, res) => {
    connection.query('SELECT src_json FROM planets', (err, result) => {
        if(err) {
            res.status(500).json({message: 'There was an error'})
        } else {
            const data = JSON.stringify(result)
            const json = JSON.parse(data)
            res.json(json[0])
        }
    })
})

app.listen(3000, ()=> {
    console.log('http://localhost:3000');
})