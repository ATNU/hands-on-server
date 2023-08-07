NOTE: This uses an old version of Nest.js and will require rewriting to avoid build problems. When doing with QuOD (which faced similar problems), it was possible to create a blank Nest.js project and paste across most of the files. There will be small adjustments to reflect updates to the way mongo is queried but these should be straightforward and indicated by errors when the application is run. Alternatively, rewrite in your preferred API software.


# Hands-On Server
Server for the Hands-On Reading project, built using [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## About

For a detailed project description, see this [article](http://www.digitalhumanities.org/dhq/vol/15/2/000558/000558.html).

### Project Team
[Aditi Nafde](https://www.ncl.ac.uk/elll/staff/profile/aditinafde.html#background)   
[Matt Coneys](https://www.ncl.ac.uk/elll/staff/profile/matthewconeys.html#background)   
[James Cummings](https://www.ncl.ac.uk/elll/staff/profile/jamescummings.html#background)    
[Tiago Sousa Garcia](https://www.ncl.ac.uk/elll/staff/profile/tiagosousa-garcia.html#publications)   

### RSE Contact
[Kate Court](www.github.com/katecourt)   
[Fiona Galston](https://github.com/fiona-galston)

## Built With

This section is intended to list the frameworks and tools you're using to develop this software. Please link to the home page or documentatation in each case.

[Nestjs](https://nestjs.com/)  

## Getting Started

### Prerequisites

### Installation

Clone and run `npm install`. You also need the Hands-On Reading app repo cloned and running and access to a mongodb instance. 
Setup a local version of mongdb community, e.g. on a [mac](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/) use brew to install and stop/start using `brew services start mongodb-community@6.0` and `brew services stop mongodb-community@6.0`. You might like to additionally install the [Compass GUI](https://www.mongodb.com/try/download/shell). 

The server runs locally with the following environment variables stored in a .env file stored at the root level.     
DB_CONNECTION_STRING=mongodb://localhost:27017/hands-on-db     
JWT_SECRET   

The excerpt from The Canterbury Tales needs to be inserted into the database upon startup. The text is too long to be inserted directly using the mongo shell, instead the javascript file 'data.js' must be run.  To do this locally, open the mongo shell and run:
 ```
load('path/to/repo/hands-on-server/src/text/data.js)
```
This javascript file contains instructions to connect to a mongodb instance running on localhost:27017. This can be changed within the file for other hosts and ports.

Alternatively, connect to the database using Compass and insert this json document: ```hands-on-server/src/text/handsontext.json```

### Running Locally

Run `npm start`.

### Running Tests

There are currently no tests. 

## Deployment

### Production

The application currently deploys to Azure using a GitHub action on any push to the master branch. 

## Usage



## Roadmap

- [x] Initial Research  
- [x] Minimum viable product  
- [ ] Alpha Release  
- [ ] Feature-Complete Release  

## Contributing

### Main Branch
Protected and can only be pushed to via pull requests. Should be considered stable and a representation of production code.

### Dev Branch
Should be considered fragile, code should compile and run but features may be prone to errors.

### Feature Branches
A branch per feature being worked on.

https://nvie.com/posts/a-successful-git-branching-model/

## License

## Citation

Please cite the associated papers for this work if you use this code:

```
@article{xxx2023paper,
  title={Title},
  author={Author},
  journal={arXiv},
  year={2023}
}
```


## Acknowledgements
This work was funded by the ATNU project.