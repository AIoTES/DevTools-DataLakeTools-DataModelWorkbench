# Datamodel Workbench

ACTIVAGE datamodel workbench is a tool for exploring the data in Data Lake produced by IoT platforms. The datamodel workbench consists of three components, i.e. Datamodel Explorer, Storage Explorer and Metadata Explorer.

* The Datamodel Explorer is responsible for providing a graphical interface to the management of Models. It interacts with the [Metadata Strorage Server](https://git.activageproject.eu/Deployment/DT-AIOTES_docker/src/master/Metadata%20Storage%20server) through the APIs exposed by Metadata Storage Server. 

* The Storage Explorer provides a visual interface on top of the [Independent Data Storage](https://git.activageproject.eu/Data_Analytics/DL-Independent_data_storage) and the schema part of the [Query Execution Component](https://git.activageproject.eu/Data_Analytics/DL-Query_execution) for management of Databases, Tables and Schemas. 

* The Metadata Explorer component provides a graphical interface for management of Devices and Deployments. For this purpose, it interacts with the Metadata Storage Server through the APIs provided.

## Getting started / Use

This required section should explain the steps needed to use it. Remember Module is fully (or mostly ) functional code, 
thus this section should explain interfaces, UIs, procedures and any other action (i.e. configuration) needed to use 
the module. This section should be targeted to the end user of the module.

## How to build, install, or deploy it

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.
2. [Yarn][]: We use Yarn to manage Node dependencies.
   Depending on your system, you can install Yarn either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

    yarn install

We use [Gulp][] as our build system. Install the Gulp command-line tool globally with:

    yarn global add gulp-cli

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    ./mvnw
    gulp

[Bower][] is used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [bower.json](bower.json). You can also run `bower update` and `bower install` to manage dependencies.
Add the `-h` flag on any command to see how you can use it. For example, `bower update -h`.




## Building for production

To optimize the test application for production, run:

    ./mvnw -Pprod clean package

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

    java -jar target/*.war

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.



## Testing

To launch your application's tests, run:

    ./mvnw clean test

### Client tests

Unit tests are run by [Karma][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

    gulp test

UI end-to-end tests are powered by [Protractor][], which is built on top of WebDriverJS. They're located in [src/test/javascript/e2e](src/test/javascript/e2e)
and can be run by starting Spring Boot in one terminal (`./mvnw spring-boot:run`) and running the tests (`gulp itest`) in a second one.
### Other tests

Performance tests are run by [Gatling][] and written in Scala. They're located in [src/test/gatling](src/test/gatling) and can be run with:

    ./mvnw gatling:execute

For more information, refer to the [Running tests page][].

## Using Docker to simplify development (optional)

First build the workbench component using the following command:

    ./mvnw -DskipTests=true -Pdev clean package

Second step is to build docker image. To build docker image, run the following command:

    docker build --no-cache -t docker-activage.satrd.es/dl-datamodel-workbench target

Third step is to run the docker image using the following command. For this step you will need `app.yml`, `mongodb.yml` and `elasticsearch.yml` files available in [src/main/docker](src/main/docker). Below command should be run from the directory where the required files exists.

    docker-compose -f app.yml up -d 

The Datamodel Workbench can be accessed using the following URL:

[http://localhost:4590/](http://localhost:4590/)

Last step is to push docker image to the activage docker registry (docker-activage.satrd.es). Use the following command:

    docker push docker-activage.satrd.es/dl-datamodel-workbench

## Integration with other Components

The Datamodel Workbench is dependent on three components i.e. Metadata Storage Server, Independent Data Storage and Query Execution Component. It will communicate with these components through the URLs specified in the [src/main/docker/app.yml](src/main/docker/app.yml) file. You can specify the base URLs of each of these components in Environment Variables (`API_MDS=Metadata Storage Server`, `API_IDS=Independent Data Storage` and `API_QE=Query Execution Component`). Don't forget to put a forward slash at the end of each base URL.

[Metadata Strorage Server:](https://git.activageproject.eu/Deployment/DT-AIOTES_docker/src/master/Metadata%20Storage%20server)


[Independent Data Storage:](https://git.activageproject.eu/Data_Analytics/DL-Independent_data_storage)


[Query Execution Component:](https://git.activageproject.eu/Data_Analytics/DL-Query_execution)


## Further Information

This section is mandatory; it will explain or link to the tutorial/course where the module itself and how to use it is 
explained. The sections above should be contextualized on the module, as if it is a standalone code. This section, 
however, should address the context of the module as part of AIOTES, thus in this section explanations about the other 
modules which this module interacts with.


## Credits

This recommended section should list the authors of the (template) project, and if possible accessible contact 
information for users to use when doubts arise. It should be easily expandable, for instance add a template to 
include other authors; the recommendation is to define a list using “Name Surname <user@host.name>" format.


## License
    
This is a required section, as we must specify the licence(s) applied to the code. This section should only be a 
summary of the licence, as explained in the licence policy.
    
<!--- You can use Docker to improve your development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.

For example, to start a mysql database in a docker container, run:

    docker-compose -f src/main/docker/mysql.yml up -d

To stop it and remove the container, run:

    docker-compose -f src/main/docker/mysql.yml down

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

    ./mvnw verify -Pprod dockerfile:build

Then run:

    docker-compose -f src/main/docker/app.yml up -d

For more information refer to [Using Docker and Docker-Compose][]

## Continuous Integration (optional) -->