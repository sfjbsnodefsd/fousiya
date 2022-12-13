const mongoose = require("mongoose");
let { describe, expect, test } = require("@jest/globals");
 

describe('Testing Pension Service ', () => {
    const mockRequest = () => {
        return {
            params: { adhaar: 1234567890 },
        };
    };
    
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };
    
 // mock + code under test definition
    beforeEach(() => {       
        jest.resetAllMocks();
    });   

   
    test('should get a pensioner using getPensionerDetailByAadhaar', async() => {
        //given 

        const mongooseConnectMock = jest.spyOn(mongoose, "connect");
        mongooseConnectMock.mockImplementation(() => "");

        const PensionerDetail = require("../pensioner");
        const pensionservice = require('../pensioner-service')
        jest.spyOn(PensionerDetail,"findOne").mockReturnValue({Name: "Mike"});

        const req = mockRequest();
        const res = mockResponse(); 

        const callbackResult = await pensionservice.getPensionerDetailByAadhaar(req, res);

        expect(callbackResult.status).toHaveBeenCalledWith(200);
        expect(callbackResult.json).toHaveBeenCalledWith({
            success: 1,
            message: { Name: "Mike" },
        });


    });

     
 

})
  