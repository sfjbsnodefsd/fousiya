export class Pensioner {
    _id: string='';
    Name: String='';
    DateOfBirth: String='';
    AadhaarNumber: String='';
    PAN: String='';
    SalaryEarned: number=0;
    Allowances: number = 0
    SelfOrFamilyPension: String='' ;
    BankDetails : BankDetails;

    constructor(){
        this.BankDetails = new BankDetails();
    }
   
}

 class BankDetails{
    BankName: String = "";
    AccountNumber: Number = 0;
    PublicOrPrivateBank: String = "";
}