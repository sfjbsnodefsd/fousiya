const mongoose = require("mongoose");
let { describe, expect, test } = require("@jest/globals");
 

describe('Testing User Service ', () => {
 // mock + code under test definition
    beforeEach(() => {
        console.log("entered");
        jest.resetAllMocks();
    });
    // tests

    const User = require("../models/user");
    test('Testing new User registration with new user details', () => {
        //given 

        const mongooseConnectMock = jest.spyOn(mongoose, "connect");
        mongooseConnectMock.mockImplementation(() => "");

        const userService = require("../service/user.service");

        const testUser = new User(
            {
                email: "admin@example.com",
                password: "admin123",
                name: "Admin"
            }
        )

        const userFindMock = jest.spyOn(User, "findOne");
        userFindMock.mockReturnValue(undefined);

        const userObjectMock = jest.spyOn(userService, "createUserobject")
        userObjectMock.mockReturnValue(testUser);


        const userSaveMock = jest.spyOn(testUser, "save")
        userSaveMock.mockReturnValue(true);

        userService.create(testUser, (err, user) => {
            expect(err).toBe(null);
            expect(user).toBe(testUser);

        });


    });


    test('Testing new User registeration with existing  user details', () => {
        //given       
        const mongooseConnectMock = jest.spyOn(mongoose, "connect");
        mongooseConnectMock.mockImplementation(() => "");

        const UserService = require('../service/user.service')

        const testUser = new User({
            email: "admin@example.com", password: "admin123", name: "Admin"
        });

        const userFindMock = jest.spyOn(User, "findOne");
        userFindMock.mockReturnValue({ name: 'Fousiya' });

        //when and Then
        UserService.create(testUser, (err, user) => {
            expect(err).toBe("User already exists");
            expect(user).toBe(undefined);
        })
    });

    test('Test getUserByUserEmail Function With User Does Not Exist In Database', () => {
        //given              
        const mongooseConnectMock = jest.spyOn(mongoose, "connect");
        mongooseConnectMock.mockImplementation(() => "");
        const userService = require('../service/user.service')

        const testUser = new User({
            email: "admin@example.com", password: "admin123", name: "Admin"
        });

        const userFindMock = jest.spyOn(User, "findOne");
        userFindMock.mockReturnValue(undefined);

        userService.getUserByUserEmail(testUser,(err,user)=>{
            expect(err).toBe("User Does Not Exists");
            expect(user).toBe(undefined);
        })
    });


  

})