# Xchedule

A simple clone of Trello. Since this is primarily a front-end app, the data is queried from localStorage. I've used JSX/JS where strict typing is not absolutely necessary to reduce development time.

[**🖥️ Live Demo (Netlify)**](https://trackier-errand.netlify.app/)

<!-- ABOUT THE PROJECT -->
## About The Project

![1](https://github.com/tejassharma-ts/trello-clone/blob/main/public/showcase/1.png)
![2](https://github.com/tejassharma-ts/trello-clone/blob/main/public/showcase/2.png)
![3](https://github.com/tejassharma-ts/trello-clone/blob/main/public/showcase/3.png)
![4](https://github.com/tejassharma-ts/trello-clone/blob/main/public/showcase/4.png)

### Built With

* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
* ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* pnpm
  ```sh
  npm install -g pnpm
  ```

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:tejassharma-ts/trello-clone.git
   ```
2. Install packages
   ```sh
   pnpm install
   ```
 3. Run the app by
    ```sh
    pnpm dev
    ```
    
### Testing with Cypress
  ```sh
  pnpm cypress open
  ```
  NOTE: please try to test app in this order:
  1. Register
  2. Project creation
  3. Task popup
  4. Drag test (you will need atleast two list to move tasks, you can re-run the Task popup(above test))
  5. Logout
  6. Login
