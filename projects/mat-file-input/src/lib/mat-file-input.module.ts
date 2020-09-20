import { NgModule } from '@angular/core';
import { MatFileInputComponent } from './mat-file-input/mat-file-input.component';
import { ByteFormatPipe } from './pipes/byte-format.pipe';

@NgModule({
  declarations: [ MatFileInputComponent, ByteFormatPipe ],
  imports: [],
  exports: [ MatFileInputComponent ]
})
export class MatFileInputModule {}
