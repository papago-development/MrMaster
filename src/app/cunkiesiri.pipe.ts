import { Pipe, PipeTransform } from '@angular/core';
import { Icon } from './icon.interface';

@Pipe({
  name: 'cunkiesiri'
})
export class CunkiesiriPipe implements PipeTransform {

  transform(array: Icon[], chunkSize: number): Icon[][] {
    if (!Array.isArray(array)) {
      return array;
    }

    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

}



