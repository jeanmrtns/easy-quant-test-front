# Calculator API

This application is a test asked by Easy Quant

## Getting Started
First, you need to install the dependencies:

```bash
npm install
# or
yarn
```

## You must create a new ".env.local" file using the ".env.example" variables before run the application.
The Database used for getting login informations is the MongoDB Atlas.

You must create an .env.local file on root of the project and use the configs in .env.example file.

NEXT_PUBLIC_API_URL= The URL that is running the back-end application (ex: http://localhost:3333)

NEXT_PUBLIC_FRONT_URL= The URL that is running this application (ex: http://localhost:3000)

MONGODB_URI= The URL provided by Mongo Atlas

MONGODB_DB= The URL of the database created on Mongo Atlas

## Running
First, run the development server:

```bash
npm run dev
# or
yarn dev
```
