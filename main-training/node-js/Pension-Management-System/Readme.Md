# Pension Management System
-------------------------
###### Overview

Pension management system allows user to list all pensioners, get details of a specific pensioner using adhaar number, the features include view/add/edit/update/delete pensioner. The application uses JWT token for authentication.  

The application perform following functionalities.The application is managed by admin who have the all permission.The pensioner can only see the calculated pension amount and bank service charge by providing  adhaar number.The password is protected by storing the pensioner and admin password to database  as encrypted.The application is secured by JWT token. For doing every process in this application, admin must have to provide the authentication token.

 Once admin login to the sytem he can do the following;
1. Create pensioner by clicking add button  
2. Update or edit pensioner details by clicking edit button  
3. Delete the pensioner by clicking the delete button 
4. View the pensioner details by clicking the view icon and also can see the details by entering aadhar number.
5. Can see the calculated amount of pension and bank service charge of pensioner

###### Software Requirements:

Nodejs : v16.17.0
mongoDB: v5.0.12
Angular: 14.2.6
Postman
VS code

 
There are 4 layer for this project:
###### 1.auth-service      
###### 2.pensioner-detail
###### 3.process-pension
###### 4.pension-management-portal named as pensionmanagement-ui created for front-end application

Backend-NodeJS application contain 3 microservices
1.auth-service
2.pensioner-detail
3.process-pension

###### auth-service
------------------
This microservice is used to Generate JWT token and creaing user credential/user register and user login and also doing password encryption and decryption.For creating user credential admin have to provide the authentication token.Authentication token will be get by the login.

following are the endpoints to use the auth service from postman:
for user regitration/creating credential:- http://localhost:5000/api/users/register
fou user login :-   http://localhost:5000/api/users/login

###### pensioner-detail
----------------
The microservice service is used for creating pensioner details and to view the pensioner detail by giving aadhar number.And can see the all pensioner details. This service will import the the CSV file to mongoDB .The user data will be accessed from mongoDB via REST API.To get the pensioner data, admin have to provide the valid token and adhaar number.

To get the pensioner detail: http://localhost:5001/getPensionerDetailByAadhaar/693079817548
to get all pensioners : http://localhost:5001/getAllPensionerDetails

###### Process Pension
---------------
The microservice will calculate the pension for the pensioner in the basis of pension plan (family or self) and also displays the bankservice charge based on the pensioner bank is public or private. User/admin has to pass the aadhar number to get the pensoin amount for the particular user. 

call the below end point to get the pension amount and bankservice charge by passing aadhar number

http://localhost:5002/ProcessPension


###### Pension Management portal
-------------------------

The User Interface is designed using Angular. The application contains different components to list all pensioners, view pensioner details, edit pensioner, view processed penioner details. A common component pensioner-detail is used in different places and can be integrdated to any page which will pass adhaar number as an input to pensioner-detail component. This will render a pensioner detail in particular page. The pensioners listing page allows user to view /edit/delete pensioner.

