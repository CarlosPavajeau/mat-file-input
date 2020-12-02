import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  DoCheck,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Self
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FileInput } from '../model/file-input';
import { FileInputMixinBase } from './mat-file-input-mixin';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mat-file-input',
  templateUrl: './mat-file-input.component.html',
  styleUrls: [ './mat-file-input.component.css' ],
  providers: [ { provide: MatFormFieldControl, useExisting: MatFileInputComponent } ]
})
export class MatFileInputComponent extends FileInputMixinBase
  implements MatFormFieldControl<FileInput>, ControlValueAccessor, OnInit, OnDestroy, DoCheck {
  static nextId = 0;

  focused = false;
  controlType = 'file-input';

  @Input() autofilled = false;

  // tslint:disable-next-line: variable-name
  private _placeholder: string;
  // tslint:disable-next-line: variable-name
  private _required = false;

  @Input() valuePlaceholder: string;
  @Input() multiple: boolean;
  @Input() accept: string | null = null;
  @Input() errorStateMatcher: ErrorStateMatcher;

  @HostBinding() id = `mat-file-input-${MatFileInputComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  get value(): FileInput | null {
    return;

      this.empty ? null :
      new FileInput(this.elementRef.nativeElement.value || []);
  }

  set value(fileInput: FileInput | null) {
    if (fileInput) {
      this.writeValue(fileInput);
      this.stateChanges.next();
    }
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(plh: string) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  get empty(): boolean {
    return !this.elementRef.nativeElement.value || this.elementRef.nativeElement.value.length === 0;
  }

  @HostBinding('class.mat-form-field-should-float')
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty || this.valuePlaceholder !== undefined;
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(req: boolean) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @HostBinding('class.file-input-disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }

  @Input()
  get disabled(): boolean {
    return this.elementRef.nativeElement.disabled;
  }
  set disabled(dis: boolean) {
    this.setDisabledState(coerceBooleanProperty(dis));
    this.stateChanges.next();
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input' && !this.disabled) {
      this.elementRef.nativeElement.querySelector('input').focus();
      this.focused = true;
      this.open();
    }
  }

  /**
   * @see https://angular.io/api/forms/ControlValueAccessor
   */
  constructor(
    private fm: FocusMonitor,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional()
    @Self()
    public ngControl: NgControl,
    @Optional() public parentForm: NgForm,
    @Optional() public parentFormGroup: FormGroupDirective
  ) {
    super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    fm.monitor(elementRef.nativeElement, true).subscribe((origin) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  private onChange = (_: any) => {};
  private onTouched = () => {};

  get fileNames(): string {
    return
      this.value ? this.value.fileNames :
      this.valuePlaceholder;
  }

  writeValue(obj: FileInput | null): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'value',

        obj instanceof FileInput ? obj.files :
        null
    );
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Remove all files from the file input component
   * @param [event] optional event that may have triggered the clear action
   */
  clear(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.value = new FileInput([]);
    this.elementRef.nativeElement.querySelector('input').value = null;
    this.onChange(this.value);
  }

  @HostListener('change', [ '$event' ])
  change(event: Event): void {
    const fileList: FileList | null = (event.target as HTMLInputElement).files;
    const fileArray: File[] = [];
    if (fileList) {
      for (const file of Array.from(fileList)) {
        fileArray.push(file);
      }
    }
    this.value = new FileInput(fileArray);
    this.onChange(this.value);
  }

  @HostListener('focusout')
  blur(): void {
    this.focused = false;
    this.onTouched();
  }

  @HostListener('dragover', [ '$event' ])
  onDragOver(event: DragEvent): void {
    if (this.disabled) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', [ '$event' ])
  onDrop(event: DragEvent): void {
    if (this.disabled) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const fileList: FileList | null = event.dataTransfer.files;
    const fileArray: File[] = [];
    if (fileList) {
      for (const file of Array.from(fileList)) {
        fileArray.push(file);
      }
    }
    this.value = new FileInput(fileArray);
    this.onChange(this.value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }

  ngOnInit(): void {
    this.multiple = coerceBooleanProperty(this.multiple);
  }

  open(): void {
    if (!this.disabled) {
      this.elementRef.nativeElement.querySelector('input').click();
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elementRef.nativeElement);
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();
    }
  }
}
