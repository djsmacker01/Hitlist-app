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
    const job = databases.createDocument(
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
    job.then(function (response) {
      addJobsToDom()
      console.log(response);
    }, function (error) {
        console.log(error);
    });
  form.reset()
}
// Populate list of jobs to the dom
 async function addJobsToDom() {
   document.querySelector('ul').innerHTML = ''
  let response = await databases.listDocuments(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
   
  );
   // console.log(response.documents[3]);
   response.documents.forEach((job) => {
     const li = document.createElement('li');
     li.textContent = `${job["company-name"]} ${job['date-added']} ${job["role"]} ${job["location"]} ${job['position-type']} ${job['source']} coffee chat? ${job['chat']} `;
     
     li.id = job.$id
     const btn = document.createElement('button');
     btn.textContent = '🛕'
     btn.onclick = () => removeJob(job.$id)
     

     const coffeeBtn = document.createElement('button');
     coffeeBtn.textContent = '🍵'
     coffeeBtn.onClick = ()=> updateChat(Job.$id)
     li.appendChild(coffeeBtn)
     li.appendChild(btn)

     document.querySelector('ul').appendChild(li)
    
   
   })

   async function removeJob(id) {
     const result = await databases.deleteDocument(
    import.meta.env.VITE_APPWRITE_DATABASE_ID, // databaseId
    import.meta.env.VITE_APPWRITE_COLLECTION_ID, // collectionId
    id // documentId
     );
     document.getElementById(id).remove()

   }

   async function updateChat(id) {
     const result =  databases.updateDocument(
    import.meta.env.VITE_APPWRITE_DATABASE_ID, // databaseId
    import.meta.env.VITE_APPWRITE_COLLECTION_ID, // collectionId
    id, // documentId
    {chat:true}, // data (optional)
  
);

     console.log(result);
     result.then(function () { location.reload() })
     
   }

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
