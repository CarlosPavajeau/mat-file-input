import { AbstractControl, ValidatorFn } from '@angular/forms';
import { FileInput } from '../model/file-input';

/**
 * Function to control content of file
 *
 * @param bytes max number of bytes allowed
 *
 * @returns maxContentSize error
 */
export function maxContentSize(bytes: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const size =
      control && control.value
        ? (control.value as FileInput).files.map((f) => f.size).reduce((acc, i) => acc + i, 0)
        : 0;

    return bytes >= size
      ? null
      : {
          maxContentSize: {
            actualSize: size,
            maxSize: bytes
          }
        };
  };
}
