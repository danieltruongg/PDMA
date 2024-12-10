import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppName',
  standalone: true
})
export class UppNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.toUpperCase();
  }

}
