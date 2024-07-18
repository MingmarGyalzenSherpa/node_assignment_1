# TODO CRUD API

A simple Express-based CRUD API for managing TODO items.

## Features

- Create, Read, Update, and Delete TODO items
- RESTful API endpoints
- JSON data format

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MingmarGyalzenSherpa/node_assignment_1.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3.Create a database and .env file according to .env.example

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### TODO API Endpoints

- `GET /todos`: Retrieve all TODO items
- `GET /todos/:id`: Retrieve a specific TODO item
- `POST /todos`: Create a new TODO item
- `PUT /todos/:id`: Update an existing TODO item
- `DELETE /todos/:id`: Delete a TODO item

### USER API Endpoints

- `GET /users`: Retrieve all TODO items
- `GET /users/:id`: Retrieve a specific TODO item
- `POST /users`: Create a new TODO item
- `PUT /users/:id`: Update an existing TODO item
- `DELETE /users/:id`: Delete a TODO item

### Authentication API Endpoints

- `POST /auth/login`: User login
- `POST /auth/refresh`: Refresh Access Token

## Live Link

https://node-assignment-1-nine.vercel.app/

## Docker Image

https://hub.docker.com/repository/docker/mingmargyalzensherpa/todo-app/general

## Usage

Send HTTP requests to `http://localhost:8000/todos` using your preferred method (e.g., cURL, Postman, or fetch API).
