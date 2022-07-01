import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortprice'
})
export class PipePipe implements PipeTransform {

  transform(number: any, ...args: any[]): any {

    console.log(number);
    let num:string = number.toString()
    if (number == 0) {
      return 0;
    }
    else {
      // hundreds
      if (number <= 999) {

        return "₹  " + num;
      }
      // thousands
      else if (number >= 1000 && number <= 999999) {


        return "₹  "+num.charAt(0) + ',' + num.slice(1, 4) ;
      }
      // millions
      else if (number >= 1000000 && number <= 999999999) {
        return "₹  " +num.slice(0, 2) + ',' + num.slice(2, 4) + ',' + num.slice(4, 9);
      }
      // billions
      // else if (number >= 1000000000 && number <= 999999999999) {
      //   return (number / 1000000000) + 'B';
      // }
      else
        return number;
    }
  }

}
