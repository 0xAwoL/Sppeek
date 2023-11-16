import app from './app.js';
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.APP_PORT

app.listen(port, () => console.log(`listening on port ${port}`))

