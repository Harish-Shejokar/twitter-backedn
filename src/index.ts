import {initServer} from "./app";
import dotenv from "dotenv";

dotenv.config();

async function  init() {
    const app = await initServer();

    const port = process.env.PORT;
    
    app.listen(port, () => {
        console.log(`server working on PORT - ${port}`)
    })

}


init();
