import express from "express"
import cors from "cors"
import config from "./config/config.js"
import mongoose from "mongoose"
import { router } from "./src/routes/index.js"

await mongoose.connect(config.db.uri)

const app = express()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    req.ctx = {
        util: {
            handleNotFound: (x) => {
                if (!x) {
                    res.status(404).send({ error: "Not found" })

                    return true
                }

                return false
            },
        },
    }

    next()
})


router(app)

app.listen(config.port, () => console.log(`Listening on :${config.port}`))
