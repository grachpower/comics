import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoContentComponent } from './no-content/no-content.component';

export const ROUTES: Routes = [
    {path: '', loadChildren: './pages/home/home.module#HomeModule'},
    {path: '**', component: NoContentComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
