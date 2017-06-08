import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {SharedModule} from "../shared/shared.module";
import {HomeRoutingModule} from "./home-routing.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {
}
