/**
 * The files to be uploaded
 */

export class FileInput {
  // tslint:disable-next-line: variable-name
  private _fileNames: string;

  // tslint:disable-next-line: variable-name
  constructor(private _files: File[] | null, private _delimiter: string = ', ') {
    this._fileNames = (this._files || []).map((f: File) => f.name).join(this._delimiter);
  }

  get files(): File[] {
    return this._files || [];
  }

  get fileNames(): string {
    return this._fileNames;
  }
}
