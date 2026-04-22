<div align="center">

# Weather Sense

</div>

This repository contains a full-stack project developed using the MERN stack (MongoDB, Express.js, React, and Node.js) that fetches local weather data from weather API and displays it on the dashboard.


## Frontend

The frontend of this 


project is meticulously crafted using React, a powerful JavaScript library. It serves as the backbone of the application, handling routing and rendering of multiple sub-components, including the visually appealing dashboard page, welcoming page, and the intuitive login/register pages. These pages are thoughtfully designed utilizing a blend of HTML, CSS, and JavaScript, ensuring an engaging and seamless user experience.

To fetch data from the Weather API and interact with the MongoDB database, the project leverages the Axios library. Axios provides a convenient and efficient way to make GET/POST requests, facilitating the retrieval and manipulation of data in a secure manner. By integrating Axios, the frontend seamlessly communicates with the backend, enabling smooth data exchange between the application and external APIs.

## Backend

The backend of this project is built using Express.js and Node.js, serving as a robust bridge between the React frontend and the database. It enables seamless communication and facilitates the retrieval of weather data by leveraging Express's powerful GET/POST functionality.

For efficient data storage and management, the project utilizes a MongoDB database hosted on MongoDB Atlas. The database consists of two collections: "Active Users" for currently logged-in users and "Registered Users" for storing details of registered users like name, email, password, and city.


## Installation and Setup


```bash
npm install
```

# Running App

**Server-side Application**

```bash
  cd server
```

```bash
  npm install
```

```bash
  npm run dev
```

**Client-side Application**

```bash
  cd server
```

```bash
  npm install
```

```bash
  npm start
```

## Dependencies
- <a href = 'https://fontawesome.com/start'> Font Awesome Icons <a/>: Library for Font Awesome solid style icons.
    ```bash
    npm i --save @fortawesome/fontawesome-svg-core
    ```
- <a href = 'https://www.npmjs.com/package/react-router-dom'> React Router Dom:</a> Package which enables client side routing in React applications.
    ```bash
    npm i react-router-dom
    ```
- <a href ='https://react-icons.github.io/react-icons/icons?name=wi'>React Icons:</a> Library for popular icons in your React projects
   ```bash
  npm install react-icons --save
  ```

- <a href ='https://apexcharts.com/docs/react-charts/'>Apexcharts.JS:</a> Library for interactive charts in React using ApexCharts
  ```bash
  npm install apexcharts --save
  ```



## Tech Stack

**Frontend:** React

**Backend:** Node, Express 

**Database:** MongoDB





## Installation

Install WeatherSense with npm after cloning the project

```bash
npm Install
```
    
## Documentation

[React Framework](https://react.dev/)

[Express JS](https://expressjs.com/)

[MongoDB](https://www.mongodb.com/)

[Axios](https://axios-http.com/)


## Features

- Fetches weather data from an API every minute and displays it in the frontend
- Allows users to register and login to access personalized weather information
- Stores user data, including name, email, password, and city, in a MongoDB database
- Provides a responsive user interface with routing and sub-component rendering using React


## Contributing

Contributions are always welcome!

If you encounter any bugs or would like to suggest improvements, please open an issue or submit a pull request.




