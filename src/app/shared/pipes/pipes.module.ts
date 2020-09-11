import { NgModule } from '@angular/core';
import { DomseguroPipe } from './domseguro.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { SearchPipe } from './search.pipe';
import { NoimagePipe } from './noimage.pipe';
const pipes = [
  DomseguroPipe,
  SearchPipe,
  NoimagePipe,
  TimeAgoPipe
];
@NgModule({
  imports: [],
  declarations: pipes,
  exports: pipes
})
export class PipesModule { }
