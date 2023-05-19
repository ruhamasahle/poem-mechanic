# poem-mechanic

Overview

In an effort to optimize studying native tongue, Amharic both generally and specifically learning poetry writing I realized the most important elements of this that should be done consistently is expanding my vocabulary and learning poetry structures. Thus far, I have created a Notion database to contain new words I come across. There are three problems with this. My discovery of new words was quite slow and wasn’t something I could control. Two, I don’t have the time to sit down and parse through texts or a dictionary to encounter new words and manually enter them into my database. Lastly, even if I had the time to do the arduous task, as a poet with some experience under my belt, I have noticed not all words can carry their weight in a poem, some sound bulky others. My aim for this project arose from a need to be efficient with my time and to circumvent the issue I encountered of not finding the right words. The first phase is to generate 10 words everyday and create 10 fresh entries to a Notion database. 

‍
Implementation

The solution principally consists of OpenAI’s API to use GPT-3 to issue a prompt and receive text completions and Notion’s API to write to a database. The responses from GPT come in one long array and need to be parsed and separated so they can be entered as distinct entries to the database. 

Additionally, as a three.js enthusiast, I took this project as an opportunity to implement a front-facing facet by creating a quirky landing page with the help of a tutorial. As someone who wants to transition into creative development, It was thrilling to finally create a relatively complex animation that introduced me to some boilerplate code for Three.js projects and principal understandings about it is different (for instance being render based and not event based). The construction of the page left me intrigued about the endless animation possibilities I can toy around with as I continue working on three.js projects.


Learning Point

This project, for me, is a composite of many shiny new toys. I learned a lot about OpenAI through building the project. Aside from solving a real issue I was facing daily, this project succeeded at helping me overcome a wariness I harbor about my competency in my role and with absorbing new tech on the horizon like AI. A few months ago, I had seen online so many people create personal projects using OpenAI’s products and I was astonished by people's curiosity, dare I say bravery. I remember wondering if I would ever have the courage to accomplish that. It just so happens I was getting quite comfortable with APIs due to work at Civilience and revisiting OpenAI a few months later, I thought to have a look, convinced it wouldn't be that bad. It's safe to say the entire development process has been a heartening experience. I discovered how much I love building out my own ideas and I’m grateful to work in a role that equips me with hard and fast tools that instill agency in me. 

‍
Next Phases

I do think this is quite a simplistic ask for such a powerful tool like OpenAI's GPT. Additionally, the existing iteration hass some major errors that undermine the usability. 

  Here are a few of those errors:

🚩 After going through several trials, I realized that there is an error with the rigour of the words returned. The words are either too commonplace or 

🚩 The second error is that the words do not have the correct translations- at all. I wonder if this model is not designed for translations. I will need to look further into    how gpt handles non-english languages. 
  
  Here are some of the ways this tool can be improved:
  
 🌱 The prompt entered needs to be engeneering with nuance. I am also thinking of using the chat api instead of the completions API. this way I can train the model for the       answers I am looking for.
 
  🌱 I want to be able to parse through poems to determine what poetic meters were used and develop an analysis between the meters and the underlying story/message of the        poems- how do the stylistic features bolster the underlying message. 
