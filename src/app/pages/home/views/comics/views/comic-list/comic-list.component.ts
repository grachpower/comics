import { Component, OnInit } from '@angular/core';

import { ComicsRepository } from '../../../../../../services/comics-repository/comics.repository';
import { ComicModel } from '../../models/comic.model';
import { NavigationTabService } from '../../../../services/navigation-tab-service/navigation-tab.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-comic-list',
    templateUrl: './comic-list.component.html',
    styleUrls: ['./comic-list.component.scss'],
})
export class ComicListComponent implements OnInit {
    public comics: ComicModel[];
    public offsetCounter: number = 0;
    public form: FormGroup;

    constructor(
        private comicsRepository: ComicsRepository,
        private tabsService: NavigationTabService,
        private fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        this.createForm();

        this.subscribeOnSearch();

        this.comicsRepository.fetchComics()
            .do(() => this.offsetCounter += 23)
            .subscribe((comics: ComicModel[]) => this.comics = comics);
    }

    public selectComic(comic: ComicModel): void {
        this.tabsService.openNewTab({route: `comics/entity/${comic.id}`, name: `${comic.title}`});
    }

    public loadNext(): void {
        this.comicsRepository.fetchComics({params: {offset: this.offsetCounter}})
            .do(() => this.offsetCounter += 23)
            .distinctUntilChanged()
            .subscribe((comics: ComicModel[]) => comics ? this.comics = [...this.comics, ...comics] : null);
    };

    public createForm(): void {
        this.form = this.fb.group({
            search: [''],
        });
    }

    public findComics(): void {
        const findValue = this.form.controls['search'].value;

        this.comicsRepository.findComic(findValue)
            .subscribe((comics: ComicModel[]) => this.comics = comics);
    }

    public subscribeOnSearch(): void {
        this.form.controls['search'].valueChanges
            .debounceTime(800)
            .distinctUntilChanged()
            .switchMap((value: string) => this.comicsRepository.findComic(value))
            .subscribe((comics: ComicModel[]) => this.comics = comics);
    }
}
