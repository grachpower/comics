import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HttpDataProvider } from './http-data-provider/http-data-provider.service';
import { ErrorHandlerService } from './error-handler/error-handler.service';
import { ComicsRepository } from './comics-repository/comics.repository';
import { HttpBaseRepository } from './http-base-repository/http-base-repository.service';
import { HeroesRepository } from './heroes-repository/heroes.reporitory';
import { FavouritesService } from './favourites-service/favourites.service';

@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [
        HttpDataProvider,
        ErrorHandlerService,
        HttpBaseRepository,
        ComicsRepository,
        HeroesRepository,
        FavouritesService,
    ],
})
export class GlobalServicesModule {}
