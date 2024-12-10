import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeDate',
  standalone: true
})
export class LocaleDatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return new Date(value).toLocaleString();
  }

}
