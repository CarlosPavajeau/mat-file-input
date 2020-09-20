import { FocusMonitor } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { MatFileInputComponent } from './mat-file-input/mat-file-input.component';
import { ByteFormatPipe } from './pipes/byte-format.pipe';

@NgModule({
  declarations: [ MatFileInputComponent, ByteFormatPipe ],
  providers: [ FocusMonitor ],
  exports: [ MatFileInputComponent, ByteFormatPipe ]
})
export class MatFileInputModule {}
