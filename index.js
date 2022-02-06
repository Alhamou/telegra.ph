import express from 'express'
import fileUpload from 'express-fileupload'

const app = express()
app.use(fileUpload())


import {upload} from './telegraph.js'


app.post("/", async (req, res, next)=>{

    const result = await upload(req.files.images)

    console.log(result)

    res.send(result)
})



const port = 3000
app.listen(port, ()=>{
    console.log("Server run on PORT:", port)
})
