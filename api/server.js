import express from "express";
import cors from "cors";
import {default as RouterV1} from "./routes/index.js"
import {default as notSupportedAPIVersion} from "./middleware/versionning/notSupported.js"
import internalIp from "internal-ip";
const app = express();
const port = 3001;

const internalIP = internalIp.v4.sync();

app.use(express.json());
app.use(cors());

// Routeur pour la version 1
app.use("/api/v1", RouterV1);

// Middleware d'erreur si tentative d'utilisation d'une version non implémentée
app.use("/api/v:version", notSupportedAPIVersion);

app.use(express.static('./upload'));

app.listen(port, internalIP, () => {
    console.log(`http://${internalIP}:${port}`);
});