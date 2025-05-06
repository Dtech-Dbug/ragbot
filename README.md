### about 
this is a project to try to build a clone of google LLM. 

<hr/>

### preview 

<video width="320" height="240" controls alt='preview video'>
  <source src="./preview.mp4" type="video/mp4">
</video>

*note: if the preview in the README doesnt work, please refer to the `preview.mp4`*

<hr/>

### stacks used 
- ReactJs + Tailwind (client)
- NodeJs + Express (server)
- PineCone SDK (RAG Support out of the box)

<hr/>

### setup 
`cd` into the RAG dir. then run the below commands 

for client run the following command - `cd client/ && npm i && npm run dev`
for server run the following cmd - `cd server/ && npm i && npm run test` 

after running those cmds, you should have the client and the server running locally.  

you may need to create `.env` at the root of your server dir. if you dont see the `.env` file already. (which is obviously not pushed due to security reasons)

the format of the env file is something like below : 

```
PINECONE_KEY=VALUE
PINECONE_ASST_NAME=VALUE
PORT=VALUE
ORIGIN=VALUE (URL of your client)
```
*note: there's falllback values set for PORT and ORIGIN, even if you don't declare them in env file, ,it will use the fallback values*

The fallback values for PORT and UI ORIGIN (default port for vite) : 
`9000` and `http://localhost:5173/` respectively.

<hr/>

## important Concepts Used In the client 
- component based architecture for modularity and readability
- usage of custom hooks to seperate logic from UI following clean code principles
- usage of provider to avoid prop driling 
- optimizations using : `useCallBack, memo` to avoid unnecessary re-renders 
- usage of browser indexedDB to store fie blob and check for cache hit for persisting state (file upload use case), cache miss means no file -> user needs to upload
- usage of loading state to perform time consuming tasks like fetching chat response / uploading large files, prevent multiple operations and improve UX
- API integration with graceful error handling
- caching of messages in LocalStorage to persist chat session on page refresh

<hr/>

### imporant concepts used in Backend 
- modular codes, seperating routes and controllers
- cors to prevent cors error 
- body parser to parse req body for POST requests
- implementation of proper req-res cycle with error handling

<hr/>

### Entry 
server - `server/index.js`
client - `client/src/main.jsx` 

<hr/>

### API docs 
route - `/chat`
body : 
```js 
{
  "messages": [
    {
      "role": "user",
      "content": "what os DC full name"
    }
  ]
}
```

sample response (after transformed in the node backend):
```js 
{
  "content": "DC's full name is Dwaipayan Chakraborty."
}
```

**Note: The PCA (PineCone Assistant) SDK does return citations and PageRef but it seems to not work properly, as it apparently returns the total pages inside an array, instead of the page where the excerpt is found.**

*in my above sample case it was returning `pages : [1,2,3]` which is the total no. of pages in the pdf, and not where the answer is found, which is Page1.* 

<hr/>

### Scopes of Future Improvements:
1. improve looks and feel (style)
2. implement proper citations 

since PCA doesn't return citations out of the box, there are 2 possible ways I can think of to achieve that 

***however, PCA does return the section where the answer lies, if we pass the `includeHIighlights` parameter.*** (refer to PCA quickstart docs for more info)

2.a. *manually parse the PDF and store the pages : content in a DS, and upon response check if any of the pages includes the highlights, if yes store that page(s) and give an option to the user to scroll to that specific page - starting from first occurence.*

2.b. *implement a button underneath the response called `check section` or something, upon clicking which we will show a popup contaning the highlight section, which is essentially the content (from the data source) where the answer lies.*

<hr/>
