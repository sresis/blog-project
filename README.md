# Blogio

Blogio is a blog post web application.

### Contents
- [Tech Stack](#Techstack)
- [Features](#Features)
- [Testing](#Testing)
- Database Design (#Database)

- Installation
- Features
- Demo Video
- Architecture Pattern

### Tech Stack<a name="Techstack"></a>
- Frontend: TypeScript, React
- Backend: TypeScript, Express, Node.js
- Database: Postgres, Sequelize-Typescript (ORM)
- Test Suite: Jest, Enzyme

### Features<a name="Features"></a>
- **Ability to create an account, log in, and log out**
    - **Create an account:**
    I built a CreateAccount React component that renders a registration form. Through an onSubmit event, upon submission of the registration form, the username and password inputs are sent via an axios post request to the create_account endpoint in the server. Utilizing sequelize-typescript, a new record in the Users database is created with the username and password inputs. As a next step, I am interested in adding encryption for security when storing the passwords in the database.
    - **Log In:**
    The Login React component renders a login form. Upon submission of the form, the username and password inputs are sent to the login endpoint in the server, where I created a function that validates 1) if the username exists in the database and 2) that the input password matches the DB password. If both conditions are true, the user is logged in, their user ID is added to the express session, and the user is redirected to the homepage. The navigation bar is conditionally rendered based on the user's login status.
    - **Log Out:**
    Upon clicking the logout button in the navigation bar, the Logout component in React hits the logout endpoint in Express. The user is logged out, the express session is removed, and the conditionally-rendered navigation now shows the "pre-login" links.

    <img src="./public/reg.gif">

- **CRUD Functionality**
    - **Create a new blog post**
    <img src="./public/createpost.gif">

    - **Read a blog post**
    - **Update a blog post**
    <img src="./public/update.gif">

    - **Delete a blog post**

    Upon clicking the delete button, the ID of the post to be deleted is passed to the server, where I created an endpoint that utilizes sequelize-typescript to delete the post from the database. I also implemented cascading deletes in my database, so that deleted posts are also removed from the Favorites table and do not show up in any user's favorite posts.
    <img src="./public/delete.gif">
- Search for blogs based on title or content
Sequelize -> converted to lowercase
*** future: add filtering by update date, 

### Database Design<a name="Database"></a>
The database includes 3 tables: Users, Posts, and Favorites.
Relationships:
- Users:Posts is 1:Many
- Users:Favorites is 1:Many
- Posts:Favorites is 1:Many


### Testing<a name="Testing"></a>
I implemented frontend unit tests using Jest and Enzyme.

To run the test suite from the frontend folder, run
```
npm test
```
