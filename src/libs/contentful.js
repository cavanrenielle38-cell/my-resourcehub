import { createClient } from "contentful";

const client = createClient({
  space: "ah004qfidjjm", // replace with your real space ID
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN, // from .env.local
});

export default client;


//import * as contentful from "contentful";
//const client = contentful.createClient({
//space: "7zyt6aa9qgtg",
//accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
//});

//export default client;

