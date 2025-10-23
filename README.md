Improvements: 
 - Move to a server sent events implementation for auto refresh so that we don't poll the endpoint every 1.5 seconds 
 - I'd move to using Axios for request handling rather than the browser's fetch API
 - Use a real logging library instead of console logs
 - Depending on future feature requests Dashboard component will have to get broken up into smaller components, it's becoming too big

To Run: 
 Simply run docker-compose up --build from the root folder and docker will handle the rest.
