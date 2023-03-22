import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'srink'
})
export class SrinkPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let result = value.slice(0, 40);
    return result+"....";
  }

}

