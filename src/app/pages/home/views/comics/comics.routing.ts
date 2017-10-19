import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComicListComponent } from './views/comic-list/comic-list.component';
import { ComicComponent } from './views/comic/comic.component';

const ROUTES: Routes = [
    {path: '', component: ComicListComponent},
    {path: 'entity/:id', component: ComicComponent},
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class ComicsRoutingModule {}
