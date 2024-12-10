import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kilogramGram',
  standalone: true
})
export class KilogramGramPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return `${parseFloat(value)*1000}g`;
  }

}
