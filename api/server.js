import express from "express";
import cors from "cors";
import {default as RouterV1} from "./routes/index.js"
import {default as notSupportedAPIVersion} from "./middleware/versionning/notSupported.js"
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Middleware d'erreur si tentative d'utilisation d'une version non implémentée
app.use("/api/v:version", notSupportedAPIVersion);

//placé après la route qui vérifie la verison
app.use("/api/v1", RouterV1); // Routeur pour la version 1



app.use(express.static('./upload'));

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});