# MatFileInput

Material component for files

# Build status

[![Build Status](https://travis-ci.com/cantte/mat-input-file.svg?branch=master)](https://travis-ci.com/cantte/mat-input-file.svg?branch=master)
![Node.js CI](https://github.com/cantte/mat-file-input/workflows/Node.js%20CI/badge.svg)
[![cantte](https://circleci.com/gh/cantte/mat-file-input.svg?style=svg)](https://circleci.com/gh/cantte/mat-file-input)

# This project provides:

- `mat-file-input` component, to use inside Angular Material `mat-form-field`
- a `FileValidator` with `maxContentSize`, to limit the file size
- a `ByteFormatPipe` to format the file size in a human-readable format

## Install

```
npm i mat-file-input --save
```

## API reference

### MatFileInputModule

```ts
import { MatFileInputModule } from 'mat-file-input';

@NgModule({
  imports: [
    // the module for this lib
    MatFileInputModule
  ]
})
```

#### MAT_FILE_INPUT_CONFIG token (optional):

Change the unit of the ByteFormat pipe

```ts
export const config: FileInputConfig = {
  sizeUnit: "Octet",
};

// add with module injection
providers: [{ provide: MAT_FILE_INPUT_CONFIG, useValue: config }];
```

### FileInputComponent

selector: `<mat-file-input>`

implements: [MatFormFieldControl](https://material.angular.io/components/form-field/api#MatFormFieldControl)<FileInput> from Angular Material

**Additionnal properties**

| Name                                  | Description                                                                                                                 |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| _@Input()_ valuePlaceholder: `string` | Placeholder for file names, empty by default                                                                                |
| _@Input()_ multiple: `boolean`        | Allows multiple file inputs, `false` by default                                                                             |
| _@Input()_ autofilled: `boolean`      | Whether the input is currently in an autofilled state. If property is not present on the control it is assumed to be false. |
| _@Input()_ accept: `string`           | Any value that `accept` attribute can get. [more about "accept"](https://www.w3schools.com/tags/att_input_accept.asp)       |
| value: `FileInput`                    | Form control value                                                                                                          |
| empty: `boolean`                      | Whether the input is empty (no files) or not                                                                                |
| clear(): `(event?) => void`           | Removes all files from the input                                                                                            |

### ByteFormatPipe

**Example**

```html
<span>{{ 104857600 | byteFormat }}</span>
```

_Output:_ 100 MB

### FileValidator

| Name                                           | Description                                     | Error structure                           |
| ---------------------------------------------- | ----------------------------------------------- | ----------------------------------------- |
| maxContentSize(value: `number`): `ValidatorFn` | Limit the total file(s) size to the given value | `{ actualSize: number, maxSize: number }` |
