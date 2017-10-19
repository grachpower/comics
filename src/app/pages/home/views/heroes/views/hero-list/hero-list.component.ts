import { Component, OnInit } from '@angular/core';

import { HeroModel } from '../../models/hero.model';
import { NavigationTabService } from '../../../../services/navigation-tab-service/navigation-tab.service';
import { HeroesRepository } from '../../../../../../services/heroes-repository/heroes.reporitory';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit {
    public heroes: HeroModel[];
    public offsetCounter: number = 0;
    public form: FormGroup;

    constructor(
        private heroesRepository: HeroesRepository,
        private tabsService: NavigationTabService,
        private fb: FormBuilder,
    ) {}

    public ngOnInit(): void {
        this.createForm();

        this.subscribeOnSearch();

        this.heroesRepository.fetchHeroes()
            .do(() => this.offsetCounter += 23)
            .subscribe((heroes: HeroModel[]) => this.heroes = heroes);
    }

    public selectHero(hero: HeroModel): void {
        this.tabsService.openNewTab({route: `heroes/entity/${hero.id}`, name: `${hero.name}`});
    }

    public loadNext(): void {
        this.heroesRepository.fetchHeroes({params: {offset: this.offsetCounter}})
            .do(() => this.offsetCounter += 23)
            .distinctUntilChanged()
            .subscribe((heroes: HeroModel[]) => this.heroes = [...this.heroes, ...heroes]);
    }

    public createForm(): void {
        this.form = this.fb.group({
            search: [''],
        });
    }

    public findHeroes(): void {
        const findValue = this.form.controls['search'].value;

        this.heroesRepository.findHeroes(findValue)
            .subscribe((heroes: HeroModel[]) => this.heroes = heroes);
    }

    public subscribeOnSearch(): void {
        this.form.controls['search'].valueChanges
            .debounceTime(800)
            .distinctUntilChanged()
            .switchMap((value: string) => this.heroesRepository.findHeroes(value))
            .subscribe((heroes: HeroModel[]) => this.heroes = heroes);
    }
}
