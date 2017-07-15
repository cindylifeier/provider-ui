import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {SharedModule} from "../shared/shared.module";
import {HomeRoutingModule} from "./home-routing.module";
import {PatientListCardComponent} from "./patient-list-card/patient-list-card.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    PatientListCardComponent
  ]
})
export class HomeModule {
}
