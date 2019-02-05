var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, HostListener, ElementRef, Renderer, Injectable, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
var JerryMaskModel = /** @class */ (function () {
    function JerryMaskModel() {
        this.type = "alfa";
        this.decimal = 2;
        this.decimalCaracter = ",";
        this.userCaracters = false;
        this.numberAndTousand = false;
    }
    return JerryMaskModel;
}());
export { JerryMaskModel };
export var JERRYMASKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return JerryMaskerDirective; }),
    multi: true
};
var JerryMaskerDirective = /** @class */ (function () {
    function JerryMaskerDirective(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.jmasker = new JerryMaskModel();
    }
    JerryMaskerDirective.prototype.inputKeyup = function (event) {
        var value = this.returnValue(event.target.value);
        this.writeValue(value);
        console.log(event.target.value);
        event.target.value = value;
    };
    JerryMaskerDirective.prototype.inputOnblur = function (event) {
        var value = this.returnValue(event.value);
        console.log(event.value);
        //this.writeValue(value);
        event.value = value;
    };
    JerryMaskerDirective.prototype.inputFocus = function (event) {
        var value = this.returnValue(event.value);
        console.log(event.value);
        //this.writeValue(value);
        event.value = value;
    };
    JerryMaskerDirective.prototype.ngOnInit = function () {
        if (!this.jmasker.type) {
            this.jmasker.type = "all";
        }
        if (!this.jmasker.decimal) {
            this.jmasker.decimal = 2;
        }
        if (!this.jmasker.decimalCaracter) {
            this.jmasker.decimalCaracter = ",";
        }
    };
    JerryMaskerDirective.prototype.writeValue = function (value) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, "value", value);
    };
    JerryMaskerDirective.prototype.registerOnChange = function (fn) {
        return;
    };
    JerryMaskerDirective.prototype.registerOnTouched = function (fn) {
        return;
    };
    JerryMaskerDirective.prototype.setDisabledState = function (isDisabled) {
        if (isDisabled) {
            this._renderer.setElementAttribute(this._elementRef.nativeElement, "disabled", "true");
        }
        else {
            this._renderer.setElementAttribute(this._elementRef.nativeElement, "disabled", "false");
        }
    };
    JerryMaskerDirective.prototype.writeCreateValue = function (value, config) {
        if (config === void 0) { config = new JerryMaskModel(); }
        if (value && config.phone) {
            return value.replace(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/gi, "$1 ($2) $3-$4");
        }
        if (value && config.money) {
            return this.writeValueMoney(value, config);
        }
        if (value && config.person) {
            return this.writeValuePerson(value);
        }
        if (value && config.percent) {
            return this.writeValuePercent(value);
        }
        if (value && config.mask) {
            this.jmasker.mask = config.mask;
            if (config.len) {
                this.jmasker.len = config.len;
            }
            return this.onInput(value);
        }
        return value;
    };
    JerryMaskerDirective.prototype.writeValuePercent = function (value) {
        value.replace(/\D/gi, "");
        value.replace(/%/gi, "");
        return value.replace(/([0-9]{0})$/gi, "%$1");
    };
    JerryMaskerDirective.prototype.writeValuePerson = function (value) {
        if (value.length <= 11) {
            return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/gi, "$1.$2.$3-$4");
        }
        else {
            return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/gi, "$1.$2.$3/$4-$5");
        }
    };
    JerryMaskerDirective.prototype.writeValueMoney = function (value, config) {
        if (config === void 0) { config = new JerryMaskModel(); }
        return this.moneyMask(value, config);
    };
    JerryMaskerDirective.prototype.returnValue = function (value) {
        if (!this.jmasker.mask) {
            this.jmasker.mask = "";
        }
        if (value) {
            var v = value;
            if (this.jmasker.type === "alfa") {
                v = v.replace(/\d/gi, "");
            }
            if (this.jmasker.type === "num") {
                v = v.replace(/\D/gi, "");
            }
            if (this.jmasker.money) {
                return this.moneyMask(this.onInput(v), this.jmasker);
            }
            if (this.jmasker.phone) {
                return this.phoneMask(v);
            }
            if (this.jmasker.phoneNotDDD) {
                return this.phoneNotDDDMask(v);
            }
            if (this.jmasker.person) {
                return this.peapollMask(v);
            }
            if (this.jmasker.percent) {
                return this.percentMask(v);
            }
            if (this.jmasker.numberAndTousand) {
                return this.thousand(v);
            }
            if (this.jmasker.userCaracters) {
                return this.usingSpecialCharacters(v, this.jmasker.mask, this.jmasker.len);
            }
            return this.onInput(v);
        }
        else {
            return "";
        }
    };
    JerryMaskerDirective.prototype.percentMask = function (v) {
        var tmp = v;
        tmp = tmp.replace(/\D/gi, "");
        tmp = tmp.replace(/%/gi, "");
        tmp = tmp.replace(/([0-9]{0})$/gi, "%$1");
        return tmp;
    };
    JerryMaskerDirective.prototype.phoneMask = function (v) {
        var n = v;
        if (n.length > 14) {
            this.jmasker.len = 15;
            this.jmasker.mask = "(99) 99999-9999";
            n = n.replace(/\D/gi, "");
            n = n.replace(/(\d{2})(\d)/gi, "$1 $2");
            n = n.replace(/(\d{5})(\d)/gi, "$1-$2");
            n = n.replace(/(\d{4})(\d)/gi, "$1$2");
        }
        else {
            this.jmasker.len = 14;
            this.jmasker.mask = "(99) 9999-9999";
            n = n.replace(/\D/gi, "");
            n = n.replace(/(\d{2})(\d)/gi, "$1 $2");
            n = n.replace(/(\d{4})(\d)/gi, "$1-$2");
            n = n.replace(/(\d{4})(\d)/gi, "$1$2");
        }
        return this.onInput(n);
    };
    JerryMaskerDirective.prototype.phoneNotDDDMask = function (v) {
        var n = v;
        if (n.length > 9) {
            this.jmasker.len = 10;
            this.jmasker.mask = "99999-9999";
            n = n.replace(/\D/gi, "");
            n = n.replace(/(\d{5})(\d)/gi, "$1-$2");
            n = n.replace(/(\d{4})(\d)/gi, "$1$2");
        }
        else {
            this.jmasker.len = 9;
            this.jmasker.mask = "9999-9999";
            n = n.replace(/\D/gi, "");
            n = n.replace(/(\d{4})(\d)/gi, "$1-$2");
            n = n.replace(/(\d{4})(\d)/gi, "$1$2");
        }
        return this.onInput(n);
    };
    JerryMaskerDirective.prototype.peapollMask = function (v) {
        var n = v;
        if (n.length > 14) {
            this.jmasker.len = 18;
            this.jmasker.mask = "99.999.999/9999-99";
            n = n.replace(/\D/gi, "");
            n = n.replace(/(\d{2})(\d)/gi, "$1.$2");
            n = n.replace(/(\d{3})(\d)/gi, "$1.$2");
            n = n.replace(/(\d{3})(\d)/gi, "$1/$2");
            n = n.replace(/(\d{4})(\d{1,4})$/gi, "$1-$2");
            n = n.replace(/(\d{2})(\d{1,2})$/gi, "$1$2");
        }
        else {
            this.jmasker.len = 14;
            this.jmasker.mask = "999.999.999-99";
            n = n.replace(/\D/gi, "");
            n = n.replace(/(\d{3})(\d)/gi, "$1.$2");
            n = n.replace(/(\d{3})(\d)/gi, "$1.$2");
            n = n.replace(/(\d{3})(\d{1,2})$/gi, "$1-$2");
        }
        return this.onInput(n);
    };
    JerryMaskerDirective.prototype.moneyMask = function (value, config) {
        var decimal = config.decimal || this.jmasker.decimal;
        value = value
            .replace(/\D/gi, "")
            .replace(new RegExp("([0-9]{" + decimal + "})$", "g"), config.decimalCaracter + "$1");
        if (value.length === decimal + 1) {
            return "0" + value; // leading 0 so we're not left with something weird like ",50"
        }
        else if (value.length > decimal + 2 && value.charAt(0) === "0") {
            return value.substr(1); // remove leading 0 when we don't need it anymore
        }
        if (config.thousand && value.length > Number(4) + Number(config.decimal)) {
            value = value.replace(new RegExp("([0-9]{3})" + config.decimalCaracter + "([0-9]{" + config.decimal + "}$)", "g"), config.thousand + "$1" + config.decimalCaracter + "$2");
        }
        if (config.thousand && value.length > Number(8) + Number(config.decimal)) {
            value = value.replace(new RegExp("([0-9]{3})" + config.thousand + "([0-9]{3})" + config.decimalCaracter + "([0-9]{" + config.decimal + "}$)", "g"), config.thousand + "$1" + config.thousand + "$2" + config.decimalCaracter + "$3");
        }
        return value;
    };
    JerryMaskerDirective.prototype.onInput = function (value) {
        var ret = this.formatField(value, this.jmasker.mask, this.jmasker.len);
        return ret;
        // if (ret) {
        //   this.element.nativeElement.value = ret;
        // }
    };
    JerryMaskerDirective.prototype.thousand = function (value) {
        var val = value.replace(/\D/gi, "");
        var reverse = val
            .toString()
            .split("")
            .reverse()
            .join("");
        var thousands = reverse.match(/\d{1,3}/g);
        if (thousands) {
            return thousands
                .join("" + (this.jmasker.thousand || "."))
                .split("")
                .reverse()
                .join("");
        }
        return val;
    };
    JerryMaskerDirective.prototype.usingSpecialCharacters = function (campo, Mascara, tamanho) {
        if (!tamanho) {
            tamanho = 99999999999;
        }
        var boleanoMascara;
        var exp = /\-|\.|\,| /gi;
        var campoSoNumeros = campo.toString().replace(exp, "");
        var posicaoCampo = 0;
        var NovoValorCampo = "";
        var TamanhoMascara = campoSoNumeros.length;
        for (var i = 0; i < TamanhoMascara; i++) {
            if (i < tamanho) {
                boleanoMascara =
                    Mascara.charAt(i) === "-" ||
                        Mascara.charAt(i) === "." ||
                        Mascara.charAt(i) === ",";
                if (boleanoMascara) {
                    NovoValorCampo += Mascara.charAt(i);
                    TamanhoMascara++;
                }
                else {
                    NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                    posicaoCampo++;
                }
            }
        }
        return NovoValorCampo;
    };
    JerryMaskerDirective.prototype.formatField = function (campo, Mascara, tamanho) {
        if (!tamanho) {
            tamanho = 99999999999;
        }
        var boleanoMascara;
        var exp = /\-|\.|\/|\(|\)|\,|\*|\+|\@|\#|\$|\&|\%|\:| /gi;
        var campoSoNumeros = campo.toString().replace(exp, "");
        var posicaoCampo = 0;
        var NovoValorCampo = "";
        var TamanhoMascara = campoSoNumeros.length;
        for (var i = 0; i < TamanhoMascara; i++) {
            if (i < tamanho) {
                boleanoMascara =
                    Mascara.charAt(i) === "-" ||
                        Mascara.charAt(i) === "." ||
                        Mascara.charAt(i) === "/";
                boleanoMascara =
                    boleanoMascara ||
                        (Mascara.charAt(i) === "(" ||
                            Mascara.charAt(i) === ")" ||
                            Mascara.charAt(i) === " ");
                boleanoMascara =
                    boleanoMascara ||
                        (Mascara.charAt(i) === "," ||
                            Mascara.charAt(i) === "*" ||
                            Mascara.charAt(i) === "+");
                boleanoMascara =
                    boleanoMascara ||
                        (Mascara.charAt(i) === "@" ||
                            Mascara.charAt(i) === "#" ||
                            Mascara.charAt(i) === ":");
                boleanoMascara =
                    boleanoMascara ||
                        (Mascara.charAt(i) === "$" ||
                            Mascara.charAt(i) === "&" ||
                            Mascara.charAt(i) === "%");
                if (boleanoMascara) {
                    NovoValorCampo += Mascara.charAt(i);
                    TamanhoMascara++;
                }
                else {
                    NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                    posicaoCampo++;
                }
            }
        }
        return NovoValorCampo;
    };
    __decorate([
        Input(),
        __metadata("design:type", JerryMaskModel)
    ], JerryMaskerDirective.prototype, "jmasker", void 0);
    __decorate([
        HostListener("keyup", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], JerryMaskerDirective.prototype, "inputKeyup", null);
    __decorate([
        HostListener("ionBlur", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], JerryMaskerDirective.prototype, "inputOnblur", null);
    __decorate([
        HostListener("ionFocus", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], JerryMaskerDirective.prototype, "inputFocus", null);
    JerryMaskerDirective = __decorate([
        Directive({
            selector: "[jmasker]"
        }),
        Injectable(),
        __metadata("design:paramtypes", [Renderer, ElementRef])
    ], JerryMaskerDirective);
    return JerryMaskerDirective;
}());
export { JerryMaskerDirective };
//# sourceMappingURL=jerry-mask.js.map