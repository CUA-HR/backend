import express from "express";
import multer from 'multer';
import http from "http";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./routes";

require('dotenv').config()

const app = express();



const port = process.env.PORT || 8000

app.use(cors({
    credentials: true
}));

app.use(compression());

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true, }));

const server = http.createServer(app);

const upload = multer({ dest: 'uploads' });

app.use("/", router())

server.listen(port, () => {
    console.log(`server running on http://localhost:${port}/`);
});