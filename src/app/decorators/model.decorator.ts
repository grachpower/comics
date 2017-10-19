import { forEach, isArray, isUndefined, map } from 'lodash';

import { getAutowired } from './autowired.decorator';
import { getMappedClass } from './mapped-class.decorator';

export function Model() {
    return function Model<T extends {new(...args: any[]): {}}>(targetConstructor: T) {
        return class extends targetConstructor {
            public resolveParams (params?: any): void {
                forEach(params, (value: any, key: string) => {
                    if (!isArray(value)) {
                        const autowiredClass: new (data: any) => any = getAutowired(this, key);

                        if (!isUndefined(autowiredClass)) {
                            (<any>this)[key] = new autowiredClass(value);

                            return;
                        }

                        (<any>this)[key] = value;

                        return;
                    }

                    const mappedClass: any = getMappedClass(this, key);

                    if (!isUndefined(mappedClass)) {
                        (<any>this)[key] = map(value, (param: any) => new mappedClass(param));

                        return;
                    }

                    (<any>this)[key] = value;
                });
            };
        }
    };
}
