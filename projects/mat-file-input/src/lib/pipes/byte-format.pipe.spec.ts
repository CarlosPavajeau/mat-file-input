import { TestBed } from '@angular/core/testing';
import { FileInputConfig, MAT_FILE_INPUT_CONFIG } from './../model/file-input-config';
import { ByteFormatPipe } from './byte-format.pipe';

describe('ByteFormatPipe', () => {
  let pipe: ByteFormatPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ByteFormatPipe ]
    });
    pipe = TestBed.inject(ByteFormatPipe);
  });

  it('should format a given value', () => {
    const text = pipe.transform(104857600);
    expect(text).toBe('100 MB');
  });

  it('should not format 0 value', () => {
    const text = pipe.transform(0);
    expect(text).toBe('0 Byte');
  });
});

describe('ByteFormatPipe with injection token', () => {
  let pipe: ByteFormatPipe;
  const config: FileInputConfig = {
    sizeUnit: 'Octet'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ByteFormatPipe, { provide: MAT_FILE_INPUT_CONFIG, useValue: config } ]
    });
    pipe = TestBed.inject(ByteFormatPipe);
  });

  it('should format a gicen value', () => {
    const text = pipe.transform(104857600);
    expect(text).toBe('100 MO');
  });

  it('should format 0 value', () => {
    const text = pipe.transform(0);
    expect(text).toBe('0 Octet');
  });
});
