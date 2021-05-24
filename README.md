# Dynamic Breadcrumb File Browser

The goal of this project was to implement a breadcrumb file-browser component in React given the following requirements:
- *There should be a breadcrumb showing the current location in the directory structure*
    - *Each part in the breadcrumb should be separated and clickable. Clicking on a folder in the breadcrumb will take you to that folder*
- *The main portion of the page should display the contents of the current directory*
    - *or "THIS IS FILE: {filename}" if the path is a file*
    - *Clicking on any of the files or folders in this portion of the page should take you to that file* 
- *There should be a simple http server with a single endpoint: GET /path/{mypath} should return the data about the given path*
    - *For directories, it should only include direct children, not the full subtree*
- *The directory structure (shown below) should only be available to the server, and not the client.*
    - *The client may only access this structure via the /path call on your server*
    - *May do any automated transformations you wish on this data structure to make it easier to work with, but the transformations should be automated (i.e. we should easily be able to replace it with another structure to test).*



### Directory Structure Sample:

`
let root = {
type: &#34;dir&#34;,
children: {
home: {
type: &#34;dir&#34;,
children: {
myname: {
type: &#34;dir&#34;,
children: {
&#34;filea.txt&#34;: {
type: &#34;file&#34;,
},
"fileb.txt": {
type: &#34;file&#34;,
},
"projects": {
type: &#34;dir&#34;,
children: {
mysupersecretproject: {
type: &#34;dir&#34;,
children: {
mysupersecretfile: {
type: &#34;file&#34;,
},
},
}
},
},
}
},
},
}
},
};
`


## **Tools used to create this project**

This project built on top of [Create React App](https://github.com/facebook/create-react-app).

External libraries include:
- [React Router](https://www.npmjs.com/package/react-router)
- [Concurrently](https://www.npmjs.com/package/concurrently)

## **Setup**
1. git clone this repo
2. run "`npm install`" on the terminal

## **Available Script**

### `npm run dev`

Starts the NodeJS HTTP server and launches the React app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

