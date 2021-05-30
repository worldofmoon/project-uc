import path from 'path';
import {createConnection} from "typeorm";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./routes";
import { User } from "./models/user";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

createConnection().then(async () => {
  const {
    ONG_NAME,
    ONG_EMAIL,
    ONG_PASSWORD,
  } = process.env;

  try {
    await User.createAdmin(ONG_NAME, ONG_NAME, ONG_EMAIL, ONG_PASSWORD);
  } catch(e) {
    console.log(e);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('API Running on port', port);
    console.log(__dirname)
  });
});
