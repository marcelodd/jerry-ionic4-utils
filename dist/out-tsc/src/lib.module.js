var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from "@angular/common";
import { JerryMaskerDirective } from "./directives/jerry-mask";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
var LibModule = /** @class */ (function () {
    function LibModule() {
    }
    LibModule = __decorate([
        NgModule({
            declarations: [JerryMaskerDirective],
            entryComponents: [],
            imports: [
                CommonModule
            ],
            exports: [JerryMaskerDirective],
            providers: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            bootstrap: []
        })
    ], LibModule);
    return LibModule;
}());
export { LibModule };
//# sourceMappingURL=lib.module.js.map