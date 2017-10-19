import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { AppRoutingModule } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { NoContentComponent } from './no-content/no-content.component';

import '../styles/styles.scss';
import './util/URI';

import { GlobalServicesModule } from './services/global-services.module';
import { SharedModule } from './shared/shared.module';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NoContentComponent,
    ],
    /**
     * Import Angular's modules.
     */
    imports: [
        SharedModule,
        BrowserAnimationsModule,
        GlobalServicesModule,
        AppRoutingModule,
    ],
    /**
     * Expose our Services and Providers into Angular's dependency injection.
     */
    providers: [
        ENV_PROVIDERS,
    ]
})
export class AppModule {
}
