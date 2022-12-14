## 1.auth-service      
## 2.pensioner-detail
## 3.process-pension
## 4.pension-management-portal named as pensionmanagement-ui created for front-end application

Backend-NodeJS application contain 3 microservices
1.auth-service
2.pensioner-detail
3.process-pension

### auth-service
------------------
This microservice is used to Generate JWT token and creaing user credential/user register and user login and also doing password encryption and decryption.For creating user credential admin have to provide the authentication token.Authentication token will be get by the login.

following are the endpoints to use the auth service from postman:
for user regitration/creating credential:- http://localhost:5000/api/users/register
fou user login :-   http://localhost:5000/api/users/login

### pensioner-detail
----------------
The microservice service is used for creating pensioner details and to view the pensioner detail by giving aadhar number.And can see the all pensioner details. This service will import the the CSV file to mongoDB .The user data will be accessed from mongoDB via REST API.To get the pensioner data, admin have to provide the valid token and adhaar number.

To get the pensioner detail: http://localhost:5001/getPensionerDetailByAadhaar/693079817548
to get all pensioners : http://localhost:5001/getAllPensionerDetails

### Process Pension
---------------
The microservice will calculate the pension for the pensioner in the basis of pension plan (family or self) and also displays the bankservice charge based on the pensioner bank is public or private. User/admin has to pass the aadhar number to get the pensoin amount for the particular user. 

call the below end point to get the pension amount and bankservice charge by passing aadhar number

http://localhost:5002/ProcessPension


## Commands
To run Each Service <code>npm start</code>
To run tests use <code>npm test</code>