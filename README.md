# api-node-gobarber

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.15][nodejs] installed on your computer. From your command line:

### Install API
```bash
# Clone this repository
$ git clone https://github.com/Felps03/api-node-gobarber

# Go into the repository
$ cd api-node-gobarber

# Install dependencies
$ npm i

# Created Postgree Docker container
$ docker run --name database_meetapp -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=database_meetapp -p 5432:5432 -d postgres

# Created Mongo Docker container
$ docker run --name mongo_bmstarter -p 27017:27017 -d -t mongo

# Created Redis Docker container
$ docker run --name redismeetapp -p 6379:6379 -d -t redis:alpine

# Run the API
$ npm run dev
```