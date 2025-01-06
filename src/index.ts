import {initServer} from "./app";
import dotenv from "dotenv";

async function  init() {
    const app = await initServer();
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`server working on PORT - ${port}`)
    })

}


init();
