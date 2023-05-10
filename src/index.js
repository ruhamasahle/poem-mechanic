import { Client } from "@notionhq/client"
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";
import cron from 'node-cron'
import dotenv from 'dotenv'
dotenv.config()



const apiKey = process.env.OPENAI_API_KEY
const ORGANIZATION = process.env.ORGANIZATION
const configuration = new Configuration({
  organization: ORGANIZATION,
  apiKey: apiKey,
});

// OpenAI setup
const openai = new OpenAIApi(configuration);
const client = axios.create({
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
})

const params = {
  model: "text-davinci-003",
  prompt: "List 10 words most used in Amharic poems",
  max_tokens: 350,
  temperature: 0,
}

// Notion Set-up
const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID

async function addItem() {
  try {

    //Call OpenAI API to send a prompt
    client.post('https://api.openai.com/v1/completions', params)
      .then(async (result) => {

        //await the completion and assign it to a constant named completion
        const completion = (await result.data.choices[0].text)
        .split(')')
       
        //parse to separate amharic word from translation
         const entry = await completion.map(
          (p)=>  {
           const wordAndTranslation = p.split('(');
           console.log(wordAndTranslation)
            return wordAndTranslation
          }
        )
        //Get rid of last item as it was undefined and throwing errors
        entry.splice(10,10)
        
        // The array 'entry' is an array of arrays.
        
    // Create an entry in Notion database mapping over the array.
    const response = await entry.map((item)=>notion.pages.create({
      parent: {database_id: databaseId},
      properties: {
        title: {
          title: [
            {
              "text": {
                // entry for title column
                "content": item[0]
              }
            }
          ]
        },
        "Translation":{
          rich_text:[
            {
              "text":{
                // entry for translation column
                "content": item[1]
              }
            }
          ]
        }
      },
    }))
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

//Run every 
// cron.schedule('0 * * * * *', 
addItem()
// )