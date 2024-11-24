import express from "express";
import cors from "cors";
import {default as Router} from "./routes/index.js"
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(Router);
app.use(express.static('./upload'));

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});