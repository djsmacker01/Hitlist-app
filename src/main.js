import './style.css'

  
// const client = new Client();
// client.setProject('67b0fbb6002cc550c81b');  

import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67b0fbb6002cc550c81b');

const databases = new Databases(client);

const promise = databases.createDocument(
    '67b0fefe00344b30dc82', //database id
    '67b0ff0c000ac95dd2b4', // collection id
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
