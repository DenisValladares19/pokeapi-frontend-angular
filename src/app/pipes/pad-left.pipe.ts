import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padLeft',
  standalone: true,
})
export class PadLeftPipe implements PipeTransform {
  transform(value: number | string, len: number = 3): string {
    if (!value) return '';
    const valueString = value.toString();
    const pads = this.buildPads(len);
    return '#' + pads.substring(0, len - valueString.length) + valueString;
  }

  buildPads(length: number): string {
    let pads: string = '';
    for (let i = 0; i <= length; i++) {
      pads += '0';
    }

    return pads;
  }
}
