import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpService } from '@core/services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DocumentDeliver } from '../document-deliver.model';
import * as uuidv4 from 'uuid/v4';
import { SwalService } from '../../../../core/services/swal.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  form: FormGroup;
  paramSubs: Subscription;
  displayedColumns: string[] = [ 'pieceId', 'statusDeliver', 'timeStreet', 'motiveNotDeliver', 'actions'];

  dataSource: MatTableDataSource<DocumentDeliver> = new MatTableDataSource<
    DocumentDeliver
  >();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('refDocument', { static: true }) refDocument: ElementRef;
  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private httpService: HttpService,
    private swalService: SwalService
  ) {
    this.createForm();
    this.paramSubs = activateRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.populateForm(id);
      }
    });
  }
  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.paramSubs.unsubscribe();
  }
  createForm() {
    this.form = this.fb.group({
      id: new FormControl(null),
      dateDocument: new FormControl(null, Validators.required),
      unityCompany: new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern('^[0-9]{1,45}$')]),
      distribution: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z]+')]),
      pieceId: new FormControl(null, Validators.required),
      statusDeliver: new FormControl(null, Validators.required),
      timeStreet: new FormControl(null, Validators.required),
      motiveNotDeliver: new FormControl(null, Validators.required),
    });
  }
  onCreate() {
    const id: string = this.form.get('id').value;
    if (!id) {
      // Create
      if (this.dataSource.data.length > 23) {
        this.swalService.error('Oopss!', 'Deberás enviar estos 24 items para seguir cargando...');
      }
      const data = [...this.dataSource.data];
      this.form.get('id').setValue(uuidv4());
      data.push({ ...this.form.value });
      this.dataSource.data = data;
      this.form.reset();
      this.refDocument.nativeElement.focus();
    } else {
      // Update
      const idx = this.dataSource.data.findIndex(doc => doc.id === this.form.get('id').value);
      this.dataSource.data[idx] = { ...this.form.value };
      const data = [...this.dataSource.data];
      this.dataSource.data = data;
    }
  }
  onEdit(row) {
    this.form.setValue(row);
  }
  onDelete(id) {
    const idx = this.dataSource.data.findIndex(doc => doc.id === id);
    this.dataSource.data.splice(idx, 1);
    const data = [...this.dataSource.data] || [];
    this.dataSource.data = data;

  }
  onSubmit() {
    if (this.form.valid) {
      if (!this.form.get('id').value) {
        // this._roleService.add<Role>(this.form.value).subscribe(
        //   (resp: any) => {
        //     this.onClose(true);
        //     this.notificationService.success(':: El rol ha sido creado');
        //   },
        //   (err) => {
        //     this.notificationService.error(`:: ${err}`);
        //   },
        // );
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
  populateForm(data) {
    // this.roleSubscription = this.httpService
    //   .getSingle<Role>(data.id)
    //   .subscribe((res: any) => {
    //     this.role = res.payload;
    //     debugger
    //     this.form.get('id').setValue(this.role.id);
    //     this.form.get('rolename').setValue(this.role.rolename);
    //     this.form.get('description').setValue(this.role.description);
    //     this.form.get('ApplicationId').setValue(this.role.ApplicationId);
    //     this.form.get('active').setValue(this.role.active);
    //   }, err => this.notificationService.error(`:: ${err}`));
  }

}
