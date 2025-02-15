import './style.css'  
// const client = new Client();
// client.setProject('67b0fbb6002cc550c81b');  
import { Client, Databases, ID } from "appwrite";
import dotenv from "dotenv";

dotenv.config() // load environmental variable

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const promise = databases.createDocument(
    process.env.APPWRITE_DATABASE_ID,
    process.env.APPWRITE_COLLECTION_ID,
    ID.unique(),
    {
      "company-name": "SAAN-HUB Solutions",
      "date-added": new Date(),
      "role": "Software Engineer",
      "location": "England",
      "position-type": "Full time",
      "source": "https://100devs.org"
    }
);

promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});
