import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  constructor() { }
  private open(html: string, title: string, icon, showConfirmButton?, animation?, timer?): Promise<SweetAlertResult> {
    title = title || 'Atención';
    return Swal.fire({
      title: `<strong>${title}</strong>`,
      icon,
      html,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Sí!',
      confirmButtonAriaLabel: 'Si',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i> No',
      cancelButtonAriaLabel: 'No',
      animation: animation || false,
      timer: timer || 0
    });
  }
  success(title: string = 'Atención', text: string, showConfirmation?, animation?, timer?): Promise<SweetAlertResult> {
    return this.open(text, title, 'success', showConfirmation, animation, timer);
  }
  confirm(title: string = 'Atención', text: string, icon, animation?, timer?): Promise<SweetAlertResult> {
    return this.open(text, title, icon, true, animation, timer);
  }
  warn(title: string = 'Atención', text: string, showConfirmation?, animation?, timer?): Promise<SweetAlertResult> {
    return this.open(text, title, 'info', showConfirmation, animation, timer);
  }
  error(title: string = 'Atención', text: string,  showConfirmation?, animation?, timer?): Promise<SweetAlertResult> {
    return this.open(text, title, 'error', showConfirmation, animation, timer);
  }
}
