# react-projects

Front-end to create portfolio projects and API to store them in MongoDB database

The application purpose is to create projects for my portfolio and add them to it

# Create a database with the name "projects" in mongodb account in your collection

# create react-blog-app\server\config.env and add your own env variables

ATLAS_URI="mongodb+srv://your_username:your_password@cluster0.mwgqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
PORT="5050"

currently it works for localhost but needs also changes to be deployed to a server

you can run the server in VSCODE bash terminal with "node --env-file=config.env server"

open a new bash terminal and use "npm run dev"

#### run server

cd /D/React-blog-app/react-blog-app/server
node --env-file=config.env server

cd /D/React-blog-app/react-blog-app/user/
npm run dev
