# minicore-kanban-scrum

MVP version of a minicore web application that help teams to organize their HUs

### Prerequisites
You need to have installed:
* [Node.js](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [MongoDB](https://www.mongodb.com/) - NoSQL database.
* [Docker](https://docs.docker.com/get-started/#download-and-install-docker) - Container platform for
    applications.
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
) - Version control system.
bash
```
$ sudo apt-get install nodejs
$ sudo apt-get install npm
$ sudo apt-get install mongodb
$ sudo apt-get install docker
$ sudo apt-get install git
```
### Installation and Running the Application
Clone this repository into your local machine using Git:
bash
```
$ git clone
```
Go to the project root directory:
bash
```
$ cd minicore-kanban-scrum
```
Install the dependencies:
bash
```
$ npm install
```
Run the application:
bash
```
$ npm start
```
The application will be running on port 3000. You can access it through your browser at http://localhost:3000.
Open http://localhost:3000 in your browser, you should see the app running!

## Running the tests
To run the tests, you need to have installed [Mocha](https://mochajs.org/) - JavaScript test framework running on Node.js and [Chai](https://www.chaijs.com/) - BDD / TDD assertion library for node and the browser.
bash
```
$ npm install mocha
$ npm install chai
```
To run the tests, go to the project root directory and run:
bash
```
$ npm test
```
## Deployment
To deploy the application, you need to have installed [Docker](https://docs.docker.com/get-started/#download-and-install-docker) - Container platform for applications.
bash
```
$ sudo apt-get install docker
```
To deploy the application, go to the project root directory and run:
bash
```
$ docker-compose up
```
The application will be running on port 3000. You can access it through your browser at http://localhost:3000.
## Reference
https://www.youtube.com/watch?v=2jRYxuuWGFI
https://www.youtube.com/watch?v=ivmY43PdXbw
https://www.youtube.com/watch?v=lxYB79ANJM8