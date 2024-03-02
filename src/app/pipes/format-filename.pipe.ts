import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFilename',
  standalone: true,
})
export class FormatFilenamePipe implements PipeTransform {
  private MAX_LEN = 20;

  transform(value: string, ...args: unknown[]): string {
    if (!value) return '';
    if (value.length <= this.MAX_LEN) return value;

    const arrSplitted = value.split('.');
    const extension = arrSplitted[arrSplitted.length - 1];
    const stringJoined = arrSplitted
      .filter((str) => str !== extension)
      .join('.');

    return `${stringJoined.slice(0, this.MAX_LEN)}... .${extension}`;
  }
}
