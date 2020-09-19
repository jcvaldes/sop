import { environment } from '@env';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpService } from '@core/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DocumentDelivery } from '../../../../shared/models/document-delivery.model';
import * as uuidv4 from 'uuid/v4';
import { SwalService } from '../../../../core/services/swal.service';
import { Product } from '@shared/models/product.model';
import _ from 'lodash';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  form: FormGroup;
  pieceMsk = 'SS-000000000-SS';
  productSubs: Subscription;
  products: Product;
  defaultTime: string;
  displayedColumns: string[] = ['statusError', 'piece', 'statusDeliver', 'timeStreet', 'motiveNotDelivery', 'actions'];

  dataSource: MatTableDataSource<DocumentDelivery> = new MatTableDataSource<
    DocumentDelivery
  >();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('refDocument', { static: true }) refDocument: ElementRef;
  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private httpService: HttpService,
    private swalService: SwalService,
  ) {
    this.createForm();
    let now = new Date();
    this.defaultTime = now.getHours() + ':' + now.getMinutes();
  }
  ngOnInit(): void {
    const url = `${environment.apiUrl}/api/product`;
    this.productSubs = this.httpService.get(url).subscribe(products => {
      this.products = products;
    });
    this.form.get('timeStreet').setValue(this.defaultTime);
  }
  ngOnDestroy() {
    // this.paramSubs.unsubscribe();
  }
  createForm() {
    this.form = this.fb.group({
      id: new FormControl(null),
      StatusDeliveryId: new FormControl(null, Validators.required),
      dateDocument: new FormControl(null, Validators.required),
      unityCompany: new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern('^[0-9]{1,45}$')]),
      distribution: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
        // Validators.pattern('[a-zA-Z]+')
      ]),
      piece: new FormControl(null, [
        Validators.required
      ]),
      timeStreet: new FormControl(null, Validators.required),
      motiveNotDelivery: new FormControl(null, [
        Validators.required,
        Validators.maxLength(25)
      ]),
    });

  }
  onCreate() {
    const id: string = this.form.get('id').value;
    if (!id) {
      // Create
      if (this.dataSource.data.length > 23) {
        this.swalService.error('Oopss!', 'Deberás enviar estos 24 items para seguir cargando...', false, true);
      }
      const data = [...this.dataSource.data];
      this.form.get('id').setValue(uuidv4());
      data.push({ statusError: true, ...this.form.value });
      this.dataSource.data = data;
      this.onReset();
      // this.refDocument.nativeElement.focus();
    } else {
      // Update
      const idx = this.dataSource.data.findIndex(doc => doc.id === this.form.get('id').value);
      this.dataSource.data[idx] = { statusError: true, ...this.form.value };
      const data = [...this.dataSource.data];
      this.dataSource.data = data;
      this.onReset();
    }
  }
  onEdit(row) {
    this.form.setValue(_.omit(row, ['statusError']));
  }
  onReset() {
    this.form.reset();
    this.form.get('timeStreet').setValue(this.defaultTime);
  }
  onDelete(id) {
    const idx = this.dataSource.data.findIndex(doc => doc.id === id);
    this.dataSource.data.splice(idx, 1);
    const data = [...this.dataSource.data] || [];
    this.dataSource.data = data;
    this.onReset();
  }
  onSend() {
    if (!this.form.get('id').value) {
      const url = `${environment.apiUrl}/api/document-dispatched`;
      let payload: DocumentDelivery[] = [...this.dataSource.data];
      payload.forEach((i: DocumentDelivery) => {
        delete i.statusError;
        delete i.id;
      });
      this.httpService.post(url, this.dataSource.data).subscribe(data => {
        this.swalService.success('Atención', 'Los datos han sido guardados', false, true);
        this.dataSource.data = [];
      }, err => {
        this.swalService.error('Error', `:: ${err}`, false, true);
      });
    } else {
      // this._roleService.update<Role>(this.form.value).subscribe(
      //   (role) => {
      //     this.onClose(true);
      //     this.notificationService.success(
      //       ':: El rol ha sido actualizado',
      //     );
      //   },
      //   (err) => {
      //     this.notificationService.error(`:: ${err}`);
      //   },
      // );
    }
  }
}
