import {Component, Input, OnInit} from "@angular/core";
import {PaginationInstance} from "ng2-pagination";
import {NotificationService} from "../../shared/notification.service";
import {ProviderService} from "../shared/provider.service";
import {Patient} from "../../patient/shared/patient.model";
import {Provider} from "app/provider/shared/provider.model";

@Component({
  selector: 'c2s-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})
export class ProviderListComponent implements OnInit {
  @Input()
  public patient: Patient;
  private selectedProvider: Provider;
  public providers: Provider[];
  public paginationConfig: PaginationInstance = {
    itemsPerPage: 6,
    currentPage: 1
  };
  public accordionTab: boolean = true;

  constructor(private notificationService: NotificationService,
              private providerService: ProviderService) {
  }

  ngOnInit() {
    this.providerService.getProviders(this.patient.mrn)
      .subscribe(
        (consentProviders) => {
          this.providers = consentProviders;
        },
        err => {
          this.notificationService.show("Failed in getting providers.");
        }
      );
  }

  public onPageChange(number: number) {
    this.paginationConfig.currentPage = number;
  }
}
