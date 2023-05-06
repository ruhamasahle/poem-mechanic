import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

import dotenv from 'dotenv'
dotenv.config()

export const value =[]
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
        Authorization : `Bearer ${apiKey}`
    }

    })

    const params = {
    model: "text-davinci-003",
    // messages: [{"role": "user", "content": "Hello!"}],
    prompt: "List 10 words most used in Amharic poems",
    max_tokens: 100,
    temperature: 0,
    }

client.post('https://api.openai.com/v1/completions', params)
.then(async (result)=> {
    const words= await result.data.choices[0].text
    value.push(words)
    // console.log(result.data.choices[0].text)
    // console.log(words)
    console.log(value)
    
    // const response =  openai
    // .createCompletion(params)
    })
.catch((err)=>{
    console.log(err)
})






  

  