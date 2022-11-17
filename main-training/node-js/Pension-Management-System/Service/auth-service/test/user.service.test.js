const mongoose = require("mongoose");
const { describe, expect, test } = require("@jest/globals");


describe('Testing User Service ', () => {
    const User = require("../models/user");
    test('Testing new User registration with new user details', () => {
        //given const { jest } = require('@jest/globals')


        const mongooseConnectMock = jest.spyOn(mongoose, "connect");
        mongooseConnectMock.mockImplementation(() => "");


        const userService = require("../service/user.service");

        const tetUser = new User(
            {
                email: "admin@example.com",
                password: "admin123",
                name: "Admin"
            }
        )

        const userFindMock = jest.spyOn(User, "findOne");
        userFindMock.mockReturnValue(undefined);

        const userObjectMock = jest.spyOn(userService, "createUserobject")
        userObjectMock.mockReturnValue(tetUser);


        const userSaveMock = jest.spyOn(tetUser, "save")
        userSaveMock.mockReturnValue(true);

        userService.create(tetUser, (err, user) => {
            expect(err).toBe(null);
            expect(user).toBe(tetUser);

        });

        test('Testing new User registeration with existing  user details', () => {
            //given const { jest } = require('@jest/globals')

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
        })













    })

})