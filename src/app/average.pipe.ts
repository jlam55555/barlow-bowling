import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'average'
})
export class AveragePipe implements PipeTransform {

  transform(value: number[], decimalPlaces:number): string {
    var sum = value.reduce((accumulator, score) => accumulator + score);
    return Number(sum / value.length).toFixed(decimalPlaces);
  }

}
