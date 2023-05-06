import { Client } from "@notionhq/client"

import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

import dotenv from 'dotenv'
dotenv.config()

let value = {
  word: '',
  translation: ''
}
const apiKey = process.env.OPENAI_API_KEY
const configuration = new Configuration({
  organization: "org-40cIpEOmKy8eEuTUVY5qoPNX",
  apiKey: apiKey,

});
const openai = new OpenAIApi(configuration);

const client = axios.create({
  // baseURL: 'https://some-domain.com/api/',
  // timeout: 1000,
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ${apiKey}`
  }

})

const params = {
  model: "text-davinci-003",
  // messages: [{"role": "user", "content": "Hello!"}],
  prompt: "List 10 words most used in Amharic poems",
  max_tokens: 250,
  temperature: 0,
}


const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

async function addItem() {
  try {

    //Call OpenAI API to query prompt
    client.post('https://api.openai.com/v1/completions', params)
      .then(async (result) => {

        //await the completion and assign it to globally initialized object named value.
        const completion = (await result.data.choices[0].text)
        .split(')')
       
        //parse to separate amharic word from translation and add to value object
        completion.map(
          (p)=>  {
          const wordAndTranslation = p.split('(');
            value.word = await wordAndTranslation[0];
            value.translation= wordAndTranslation[1]
            console.log(value.word, value.translation)
          }
 
        )
    // Create an entry in Notion database providing the value.
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              "text": {
                "content": value.word
              }
            }
          ]
        },
        // content:{
        //   content:[
        //     {
        //       "content":{
        //         "content": value.translation
        //       }
        //     }
        //   ]
        // }
      },
    })
    console.log(response)
    console.log("Success! Entry added.")

  })
  //Catch any errors from OpenAI API
    .catch((err) => {
      console.log(err)
    })

  } 
  //Catch any errors from Notion's API
  catch (error) {
    console.error(error.body)
  }
}
addItem()