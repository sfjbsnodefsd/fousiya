Project created for Pension Management System
created for layer 
1.auth-service
2.pensioner-detail
3.process-pension
4.pension-management-portal


auth service created for register user/admin and when user login to the appliocation , user will get the token
following are the endpoints to use the auth service;
for user regitration:-  http://localhost:5000/api/users/register
fou user login :-       http://localhost:5000/api/users/login


pensioner detail service created for creating pensioner details.This service will import the the CSV file to mongoDB .The user data will be accessed from mongoDb via REST API.To get the pensioner data admin or user have to provide the valid token and adhaar number.

to get the pensioner detail: http://localhost:5001/getPensionerDetailByAadhaar/693079817548

process pension service will calculate the pension for the pensioner in the basis of pension plan (family or self) and also displays the bankservice charge based on the pensioner bank is public or private. User/admin has to pass the aadhar number to get the pensoin amount for the particular user. 
call the below end point to get the pension amount and bankservice charge by passing aadhar number;

http://localhost:5002/ProcessPension


