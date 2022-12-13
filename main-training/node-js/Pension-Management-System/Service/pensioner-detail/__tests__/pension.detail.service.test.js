const mongoose = require("mongoose");
let { describe, expect, test } = require("@jest/globals");
// const PensionerDetail = require("../pensioner");
const request = require('supertest')

describe('Testing Pension Service ', () => {
    // mock + code under test definition
    beforeEach(() => {
        console.log("entered");
        jest.resetAllMocks();
    });
    // tests

    
   
    describe('Pension service', () => {
        it('should get a pensioner', async () => {
            const mongooseConnectMock = jest.spyOn(mongoose, "connect");
            mongooseConnectMock.mockImplementation(() => "");
            const app = require('../index')
            // const existingPensionerDetail = new PensionerDetail({
            //     Name: "Arun madhav"
            // })
            // jest.spyOn(PensionerDetail, "findOne").mockReturnValue(existingPensionerDetail);


            // const res = await request(app)
            //     .get('/getPensionerDetailByAadhaar')
            //     .send({
            //         params: { aadhaar: 1234567890 }
            //     })
            // expect(res.statusCode).toEqual(201)
            // expect(res.body).toHaveProperty('post')
        })
    })



})