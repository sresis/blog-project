# Blogio

Blogio is an app that allows users to ......

### Contents
- [Tech Stack](#Techstack)
- [Features](#Features)
- [Testing](#Testing)

- Installation
- Features
- Demo Video
- Architecture Pattern
- Database Design
### Tech Stack<a name="Techstack"></a>
- Frontend: TypeScript, React
- Backend: TypeScript, Express, Node.js
- Database: Postgres, Sequelize-Typescript (ORM)
- Test Suite: Jest, Enzyme

### Features<a name="Features"></a>
- Ability to create an account, log in, and log out.
The navigation bar is conditionally rendered based on the user's login status. 
<img src="./public/reg.gif">
- CRUD Functionality
    - Create a new blog post
    - Read a blog post
    - Update a blog post
    - Delete a blog post
- Search for blogs based on title or content
*** future: add filtering by update date, 

### Testing<a name="Testing"></a>
I implemented frontend unit tests using Jest and Enzyme.

To run the test suite from the frontend folder, run
```
npm test
```
