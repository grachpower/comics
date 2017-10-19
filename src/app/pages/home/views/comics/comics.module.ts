import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComicsRoutingModule } from './comics.routing';
import { ComicComponent } from './views/comic/comic.component';
import { ComicPreviewComponent } from './views/comic-list/comic-preview/comic-preview.component';
import { ComicListComponent } from './views/comic-list/comic-list.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
    declarations: [
        ComicComponent,
        ComicPreviewComponent,
        ComicListComponent,
    ],
    imports: [
        SharedModule,
        ComicsRoutingModule,
        CommonModule,
        FormsModule,
    ],
})
export class ComicsModule { }
