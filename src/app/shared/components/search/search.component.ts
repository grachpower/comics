import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchComponent),
    multi: true
};

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class SearchComponent implements ControlValueAccessor {
    @Input() placeholder: string;

    public innerValue: any;
    private onChangeCallback: Function = () => {};
    private onTouchedCallback: Function = () => {};

    get value(): any {
        return this.innerValue;
    };

    set value(val: any) {
        if (val !== this.innerValue) {
            this.innerValue = val;
            this.onChangeCallback(val);
        }
    }

    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}
