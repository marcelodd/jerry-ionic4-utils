import { CommonModule } from "@angular/common";
import { JerryMaskerDirective } from "./directives/jerry-mask";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

@NgModule({
  declarations: [JerryMaskerDirective],
  entryComponents: [],
  imports: [
    CommonModule
  ],
  exports: [JerryMaskerDirective],
  providers: [

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: []
})
export class LibModule {}
