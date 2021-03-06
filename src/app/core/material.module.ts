import { NgModule } from '@angular/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MaterialFileInputModule, NGX_MAT_FILE_INPUT_CONFIG, FileInputConfig } from 'ngx-material-file-input';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
export const config: FileInputConfig = {
  sizeUnit: 'Octet'
};
import { MatTreeModule } from '@angular/material/tree';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const modules = [
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatGridListModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatNativeDateModule,
  MatTableModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTabsModule,
  MatStepperModule,
  NgxMatSelectSearchModule,
  MatAutocompleteModule,
  MaterialFileInputModule,
  NgxMaterialTimepickerModule,
  MatTreeModule,
  MatProgressBarModule,
  NgxMaterialTimepickerModule,

  // CDK
  A11yModule,
  BidiModule,
  ObserversModule,
  OverlayModule,
  PlatformModule,
  PortalModule,
  ScrollingModule,
  CdkStepperModule,
  CdkTableModule,
  CdkTreeModule,
];
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    // { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    // { provide: MAT_DATE_LOCALE, useValue: 'es-AR' }
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class MaterialModule { }
