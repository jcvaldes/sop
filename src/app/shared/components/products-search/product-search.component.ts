import { environment } from '@env';
import { Component } from '@angular/core';
import _ from 'lodash';

import { HttpService } from '../../../core/services/http.service';
import { DistributionStatus } from '../../models/distribution-status.model';
import { ComboSearchComponent } from '../../utils/combo-search/combo-search.component';

@Component({
  selector: 'app-distribution-status-search',
  templateUrl: './distribution-status-search.component.html'
})
export class DistributionStatusSearchComponent extends ComboSearchComponent<DistributionStatus> {
  selected: string;
  constructor(public httpService: HttpService ) {
    super(httpService, `${environment.apiUrl}/api/product`, false);
  }
  onSelectionChange(evt) {
    const selected = _.filter(this.payload, (el) => {
      return el.id === evt.value[0];
    });
    this.selected = selected[0].description;
  }
}
