import './style.css'

// const client = new Client()
// client.setProject('67b06d59002faaf46bb7')

import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67af7720000426a8a993');

const databases = new Databases(client);

const promise = databases.createDocument(
    '67b06e5e002b50bbb9d1',
    '67b06e7d0021cc4798be',
    ID.unique(),
    { "title": "Hamlet" }
);

promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});
