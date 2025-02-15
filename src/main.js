// import './style.css'

// // const client = new Client()
// // client.setProject('67b06d59002faaf46bb7')

// import { Client, Databases, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('67af7720000426a8a993');

// const databases = new Databases(client);

// const promise = databases.createDocument(
//   '67b06e5e002b50bbb9d1',
//   '67b06e7d0021cc4798be',
//   ID.unique(),
//   {
//     "company-name": "SAAN-HUB Solution",
//     "date-added": new Date(),
//     "role": "Software Engineer",
//     "location": "England",
//     "position-type": "Full-time",
//     "source": "https://100devs.org"
//      }
// );

// promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log(error);
// });
import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67af7720000426a8a993');

const databases = new Databases(client);

const promise = databases.createDocument(
  '67b06e5e002b50bbb9d1',  // Database ID
  '67b06e7d0021cc4798be',  // Collection ID
  ID.unique(),
  {
    "company-name": "SAAN-HUB Solution",
    "date-added": new Date().toISOString(),  // Convert Date to ISO format
    "role": "Software Engineer",
    "location": "England",
    "position-type": "Full-time",
    "source": "https://100devs.org"  // Fixed URL
  }
);

promise.then(function (response) {
    console.log("Document created successfully:", response);
}).catch(function (error) {
    console.error("Error creating document:", error);
});
