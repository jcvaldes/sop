import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[appStatusColor]',

})
export class CuposDirective  implements OnInit{
  @Input() code: string;
  constructor(private elementRef: ElementRef) {
  }
  ngOnInit() {
    switch(this.code) {
      case 1:
        this.elementRef.nativeElement.style.backgroundColor = 'green';
        break;
      case 2:
        this.elementRef.nativeElement.style.backgroundColor = 'yellow';
        break;
      case 3:
        this.elementRef.nativeElement.style.backgroundColor = 'red';
        break;
    }

  }

}
