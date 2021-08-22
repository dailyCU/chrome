const express = require("express")
const aes = require("node-aes");
const cors = require("cors")

const app = express();

app.set("port", process.env.PORT || 3000);

//app.use(cors({origin: "*", allowedHeaders: "Content-Type"}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(app.get("port"), ()=>{
    console.log("Server Running")
})

app.post("/encrypt", (req, res)=>{
    const {name, value, pwd, actualHash} = req.body;

    console.log(req.body)

    if(actualHash != "" || actualHash){


        const decrypted = aes.decrypt(actualHash, pwd);

        const json = JSON.parse(decrypted);

        json[name] = value;

        const hash  = aes.encrypt(JSON.stringify(json));

        res.send("Hash")
    }else{
        const obj = {

        }

        obj[name] = value;

        const hash =aes.encrypt(JSON.stringify(obj), pwd);

        res.send(hash)
    }
})