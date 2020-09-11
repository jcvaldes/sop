import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { DistributionStatus } from '@shared/components/distribution-status.model';
import { ComboSearch } from '../../utils/combo-search/combo-search';
import { HttpService } from '@core/services/http.service';
@Component({
  selector: 'app-distribution-status-search',
  templateUrl: './distribution-status-search.component.html',
  styleUrls: ['./distribution-status-search.component.scss']
})
export class DistributionStatusSearchComponent extends ComboSearch<DistributionStatus> {
  selected: string;
  constructor(public httpService: HttpService ) {
    super(httpService, '/api/distribution-status', false);
  }
  onSelectionChange(evt) {
    const selected = _.filter(this.payload, (el) => {
      return el.id === evt.value[0];
    });
    this.selected = selected[0].description;
  }
}
