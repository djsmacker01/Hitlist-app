// import './style.css'  
// import { Client, Databases, ID } from "appwrite";


// const client = new Client()
//     .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
//     .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// const databases = new Databases(client);

// const form = document.querySelector('form');

// form.addEventListener('submit', addJob)

// function addJob(e) {
//   e.preventDefault()
//     const job = databases.createDocument(
//     import.meta.env.VITE_APPWRITE_DATABASE_ID,
//     import.meta.env.VITE_APPWRITE_COLLECTION_ID,
//     ID.unique(),
//     {
//       "company-name": e.target.companyName.value,
//       "date-added": e.target.dateAdded.value,
//       "role": e.target.role.value,
//       "location": e.target.location.value,
//       "position-type": e.target.positionType.value,
//       "source": e.target.source.value
//     }
//     );
//     job.then(function (response) {
//       addJobsToDom()
//       console.log(response);
//     }, function (error) {
//         console.log(error);
//     });
//   form.reset()
// }
// // Populate list of jobs to the dom
//  async function addJobsToDom() {
//    document.querySelector('ul').innerHTML = ''
//   let response = await databases.listDocuments(
//     import.meta.env.VITE_APPWRITE_DATABASE_ID,
//     import.meta.env.VITE_APPWRITE_COLLECTION_ID,
   
//   );
//    // console.log(response.documents[3]);
//    response.documents.forEach((job) => {
//      const li = document.createElement('li');
//      li.textContent = `${job["company-name"]} ${job['date-added']} ${job["role"]} ${job["location"]} ${job['position-type']} ${job['source']} coffee chat? ${job['chat']} `;
     
//      li.id = job.$id
//      const btn = document.createElement('button');
//      btn.textContent = '🛕'
//      btn.onclick = () => removeJob(job.$id)
     

//      const coffeeBtn = document.createElement('button');
//      coffeeBtn.textContent = '🍵'
//      coffeeBtn.onClick = () => updateChat(Job.$id)
     
//      li.appendChild(coffeeBtn)
//      li.appendChild(btn)

//      document.querySelector('ul').appendChild(li)
    
   
//    })

//    async function removeJob(id) {
//      const result = await databases.deleteDocument(
//     import.meta.env.VITE_APPWRITE_DATABASE_ID, // databaseId
//     import.meta.env.VITE_APPWRITE_COLLECTION_ID, // collectionId
//     id // documentId
//      );
//      document.getElementById(id).remove()

//    }

//    async function updateChat(id) {
//      const result =  databases.updateDocument(
//     import.meta.env.VITE_APPWRITE_DATABASE_ID, // databaseId
//     import.meta.env.VITE_APPWRITE_COLLECTION_ID, // collectionId
//     id, // documentId
//     {'chat':true}, // data (optional)
  
// );

//      console.log(result);
//      result.then(function () { location.reload() })
     
//    }

// }
// addJobsToDom()

import './style.css';
import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const form = document.querySelector('form');
form.addEventListener('submit', addJob);

async function addJob(e) {
    e.preventDefault();
    try {
        const job = await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            ID.unique(),
            {
                "company-name": e.target.companyName.value,
                "date-added": e.target.dateAdded.value,
                "role": e.target.role.value,
                "location": e.target.location.value,
                "position-type": e.target.positionType.value,
                "source": e.target.source.value,
                "chat": false // Initialize chat status
            }
        );
        await addJobsToDom();
        form.reset();
    } catch (error) {
        console.error('Error adding job:', error);
    }
}

async function addJobsToDom() {
    try {
        const jobsList = document.querySelector('ul');
        jobsList.innerHTML = '';
        
        const response = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID
        );

        response.documents.forEach((job) => {
            const li = document.createElement('li');
            li.id = job.$id;
            
            // Format the job information more clearly
            li.textContent = `${job["company-name"]} | ${job['date-added']} | ${job["role"]} | ${job["location"]} | ${job['position-type']} | ${job['source']} | Coffee Chat: ${job['chat'] ? 'true' : 'false'}`;
            
            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '🗑️'; // Changed to a trash icon
            deleteBtn.onclick = () => removeJob(job.$id);
            
            // Create coffee chat button
            const coffeeBtn = document.createElement('button');
            coffeeBtn.textContent = '☕'; // Changed to a coffee icon
            coffeeBtn.onclick = () => updateChat(job.$id); // Fixed onClick to onclick
            
            // Add buttons to li
            li.appendChild(document.createTextNode(' ')); // Add space
            li.appendChild(coffeeBtn);
            li.appendChild(document.createTextNode(' ')); // Add space
            li.appendChild(deleteBtn);
            
            jobsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading jobs:', error);
    }
}

async function removeJob(id) {
    try {
        await databases.deleteDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            id
        );
        document.getElementById(id).remove();
    } catch (error) {
        console.error('Error removing job:', error);
    }
}

async function updateChat(id) {
    try {
        await databases.updateDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            id,
            { 'chat': true }
        );
        await addJobsToDom(); // Refresh the list instead of reloading page
    } catch (error) {
        console.error('Error updating chat status:', error);
    }
}

// Initialize the job list
addJobsToDom();