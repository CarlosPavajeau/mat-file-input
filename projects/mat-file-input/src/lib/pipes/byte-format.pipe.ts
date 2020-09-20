import { Inject, Optional, Pipe, PipeTransform } from '@angular/core';
import { FileInputConfig, MAT_FILE_INPUT_CONFIG } from '../model/file-input-config';

@Pipe({
  name: 'byteFormat'
})
export class ByteFormatPipe implements PipeTransform {
  private unit: string;

  constructor(
    @Optional()
    @Inject(MAT_FILE_INPUT_CONFIG)
    private config: FileInputConfig
  ) {
    this.unit = this.config ? this.config.sizeUnit : 'Byte';
  }

  transform(value: any, args?: any): any {
    if (parseInt(value, 10) >= 0) {
      value = this.formatBytes(+value, +args);
    }
    return value;
  }

  private formatBytes(bytes: number, decimals?: number): string {
    if (bytes === 0) {
      return '0' + this.unit;
    }

    const unitChar = this.unit.charAt(0);
    const kilobytes = 1024;
    const decimalsCount = decimals || 2;
    const sizes = [
      this.unit,
      'K' + unitChar,
      'M' + unitChar,
      'G' + unitChar,
      'T' + unitChar,
      'P' + unitChar,
      'E' + unitChar,
      'Z' + unitChar,
      'Y' + unitChar
    ];

    const byteScale = Math.floor(Math.log(bytes) / Math.log(kilobytes));

    return parseFloat((bytes / Math.pow(kilobytes, byteScale)).toFixed(decimalsCount)) + ' ' + sizes[byteScale];
  }
}
