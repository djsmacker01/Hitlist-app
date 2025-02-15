import './style.css'  
import { Client, Databases, ID } from "appwrite";


const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const promise = databases.createDocument(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
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
