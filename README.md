# Note App

The project is deployed in my personal ubuntu server
- Links: 
    - Frontend https://notes.devgustavo.com
    - Backend https://notes-api.devgustavo.com

### Frontend requirements 
- npm v9.8.1
- node v18.18.0
- Next js v14.1.4

### Backend requirement
- Database MysqL v8.*
- Java 21
- Spring Boot v3.2.4



## Run the project
Run the file run.sh

## Run the project manually

### Run Frontend, go to folder 'frontend'
Create a .env.local file and type:

~~~
NEXT_PUBLIC_URL="http://localhost:8080"
~~~
### Then run the following commands
~~~
npm install
npm run dev
~~~

> Run Backend, first of all, edit the application.properties acording to your local settings.\
Then run the following commands


~~~
mvn compile
mvn clean package
java -jar [path to .jar file]
~~~