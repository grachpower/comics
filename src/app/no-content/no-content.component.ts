import { Component } from '@angular/core';

@Component({
    selector: 'app-no-content',
    template: `<h1>404: page missing</h1>`,
    styles: [
        `
            :host {
                color: #fff;
                font-size: 3rem;
                margin-top: 2rem;
                display: flex;
                justify-content: center;
            }
        `
    ]
})
export class NoContentComponent {

}
