# TechHelpStackProject
TechHelpStack web application provides you help with your technical problems by posting an open question or doubt on the website. It connects different field experts who can answer your questions.

How to execute :

1. Clone this repository or download zip.

2. To execute backend :
      a. Setup database in postgres(create 'stackoverflow' database ) and modify localhost.properties file in "backend-api-stackoverflow2(Edited backend)\stackoverflow-db\src\main\resources\config"   
      b. Go to the 'backend-api-stackoverflow(Edited Backend)' folder in terminal(or open a terminal there)   
      c. Execute 'mvn clean install -Psetup -DskipTests' in terminal.   
      d. After build success in Step (c), go to 'stackoverflow-api' module in terminal   
      e. Execute 'mvn spring-boot:run'   
      This should start the backend   

3. To execute frontend :
      a. Go to 'tech-help-stack' folder and run 'npm start' command
      
Go to 'localhost:3000' in your browser(or whatever address is mentioned in npm start command)

Check front end features.
