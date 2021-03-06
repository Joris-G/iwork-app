import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class FileFunction {
    constructor() { }

    getCsv(inputData: any): any {
        return new Promise((resolve, reject) => {
            console.log(inputData.files);
            if (inputData.files && inputData.files[0]) {
                var myFile = inputData.files[0];
                var reader = new FileReader();
                reader.addEventListener('load', (e) => {
                    let csvdata: any = e.target.result;
                    console.log(csvdata);
                    resolve(this.getParsecsvdata(csvdata)); // calling function for parse csv data 
                });
                reader.readAsBinaryString(myFile);
            }
        })

    }

    private getParsecsvdata(csvData: any): any {
        let parsedata = [];
        let newLinebrk = csvData.split("\n");
        for (let i = 0; i < newLinebrk.length; i++) {
            parsedata.push(newLinebrk[i].split(";"))
        }
        console.table(parsedata);
        return parsedata;
    }

}
