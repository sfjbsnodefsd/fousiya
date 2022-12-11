export class Pensioner {
    _id: string='';
    Name: string='';
    DateOfBirth: string='';
    AadhaarNumber: string='';
    PAN: string='';
    SalaryEarned: number=0;
    Allowances: number = 0
    SelfOrFamilyPension: string='' ;
    BankDetails : BankDetails;

    constructor(){
        this.BankDetails = new BankDetails();
    }
   
}

 class BankDetails{
    BankName: string = "";
    AccountNumber: Number = 0;
    PublicOrPrivateBank: string = "";
}