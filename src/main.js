import './style.css'  
import { Client, Databases, ID } from "appwrite";


const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const form = document.querySelector('form');

form.addEventListener('submit', addJob)

function addJob(e) {
  e.preventDefault()
    const promise = databases.createDocument(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    ID.unique(),
    {
      "company-name": e.target.companyName.value,
      "date-added": e.target.dateAdded.value,
      "role": e.target.role.value,
      "location": e.target.location.value,
      "position-type": e.target.positionType.value,
      "source": e.target.source.value
    }
    );
  promise.then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
  form.reset()
}
// Populate list of jobs to the dom
 async function addJobsToDom() {
  
  let response = await databases.listDocuments(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
   
  );
   // console.log(response.documents[3]);
   

// promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log(error);
// });
}
addJobsToDom()

// const promise = databases.createDocument(
//     import.meta.env.VITE_APPWRITE_DATABASE_ID,
//     import.meta.env.VITE_APPWRITE_COLLECTION_ID,
//     ID.unique(),
//     {
//       "company-name": "SAAN-HUB Solutions",
//       "date-added": new Date(),
//       "role": "Software Engineer",
//       "location": "England",
//       "position-type": "Full time",
//       "source": "https://100devs.org"
//     }
// );

// promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log(error);
// });
