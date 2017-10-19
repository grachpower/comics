webpackJsonp([2],{BPDb:function(e,t){e.exports='<h3 class="hero-title">\n    {{hero?.name}}\n    <i class="icon icon_fire favourite" (click)="toggleFavourite()" [ngClass]="isFavourite ? \'favourited\' : \'unfavourited\'"></i>\n</h3>\n<div class="hero-content">\n    <div class="hero-cover">\n        <picture class="hero__picture" *ngIf="hero?.thumbnail">\n            <source [srcset]="hero?.thumbnail?.path + \'/portrait_uncanny.\' + hero?.thumbnail?.extension" media="(min-width: 768px)">\n            <source [srcset]="hero?.thumbnail?.path + \'/portrait_xlarge.\' + hero?.thumbnail?.extension" media="(min-width: 425px)">\n            <img class="image" [src]="hero?.thumbnail?.path + \'.\' + hero?.thumbnail?.extension" [alt]="hero?.name">\n        </picture>\n    </div>\n    <ng-container *ngIf="hero?.description; else empty">\n        <p class="hero-description">{{hero?.description}}</p>\n    </ng-container>\n</div>\n<div class="hero-details">\n    <div class="block">\n        <header class="block__header">\n            <h4>Comics</h4>\n        </header>\n        <div class="block__content">\n            <ng-container *ngIf="comics?.length !== 0; else empty">\n                <a class="comic__link" *ngFor="let comic of comics" (click)="selectComic(comic)">\n                    <picture class="comic__picture" *ngIf="comic?.thumbnail">\n                        <source [srcset]="comic?.thumbnail?.path + \'/portrait_medium.\' + comic?.thumbnail?.extension" media="(min-width: 768px)">\n                        <source [srcset]="comic?.thumbnail?.path + \'/portrait_medium.\' + comic?.thumbnail?.extension" media="(min-width: 100px)">\n                        <img class="image" [src]="comic?.thumbnail?.path + \'.\' + comic?.thumbnail?.extension" [alt]="comic?.title">\n                    </picture>\n                    <span>{{comic.title}}</span>\n                </a>\n            </ng-container>\n        </div>\n    </div>\n</div>\n\n<ng-template #empty>\n    <span class="empty">nothing to see here :((</span>\n</ng-template>'},EEP7:function(e,t,o){t=e.exports=o("FZ+f")(void 0),t.push([e.i,':host{display:block;margin-top:3rem;margin-bottom:2rem}.hero-list{margin-top:3rem;display:flex;flex-wrap:wrap;justify-content:space-between}.hero__item{width:23%;margin-bottom:3rem;text-align:center}.hero__about{margin-top:1.5rem;font-size:2rem}.hero__about__link{cursor:pointer}.hero__about__link:focus,.hero__about__link:hover{color:#ff1414}@media screen and (max-width:768px){.hero__item{width:23%}}@media screen and (max-width:640px){.hero__item{width:32%}}@media screen and (max-width:400px){.hero__item{width:48%}}.next-button{position:relative;width:3.4rem;height:3.4rem;outline:none;background-color:transparent;border:.4rem solid #ff1414;border-radius:50%}.next-button:hover:before{transform:rotate(180deg) translateY(50%)}.next-button:hover:after{transform:rotate(180deg) translate(50%)}.next-button:before{width:3rem;height:.4rem;top:50%;left:0;transform:translateY(-50%);transition:transform .5s ease-out .3s}.next-button:after,.next-button:before{position:absolute;content:"";background-color:#ff1414;border-radius:20%}.next-button:after{height:3rem;width:.4rem;top:0;left:50%;transform:translate(-50%);transition:transform .7s ease}.list__footer{text-align:center}.search_button{outline:none;border:none;background-color:transparent;color:#eee;font-size:2rem}.search_button:focus,.search_button:hover{color:gray}@media screen and (max-width:640px){.search-form{display:flex;justify-content:center}}',""])},Jin3:function(e,t,o){var r=o("EEP7");e.exports="string"==typeof r?r:r.toString()},Seki:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("TToO"),n=o("3j3K"),i=o("2Je8"),s=o("5oXY"),a=o("rCTf"),c=o("j6h4"),h=o("DJJx"),u=o("A2z0"),m=(function(){function e(e,t,o,r,n){this.heroesRepository=e,this.route=t,this.router=o,this.tabsService=r,this.favouritesService=n,this.isFavourite=!1}return e.prototype.ngOnInit=function(){var e=this;this.loadHero().subscribe((function(){return e.tabsService.updateCurrentTabName(e.hero.name)})),this.isFavourite=this.favouritesService.isFavourite(this.heroId,"hero"),this.router.events.switchMap((function(t){return t instanceof s.b?e.loadHero():a.Observable.of(e.hero)})).subscribe()},Object.defineProperty(e.prototype,"heroId",{get:function(){return this.route.snapshot.params.id},enumerable:!0,configurable:!0}),e.prototype.loadHero=function(){var e=this;return this.heroesRepository.fetchHero(this.heroId).switchMap((function(t){return e.hero=t,e.heroesRepository.fetchHeroComics(e.heroId)})).do((function(t){return e.comics=t}))},e.prototype.selectComic=function(e){this.tabsService.openNewTab({route:"comics/entity/"+e.id,name:""+e.title})},e.prototype.toggleFavourite=function(){this.isFavourite=!this.isFavourite,this.favouritesService.toggleFavourite(this.heroId,"hero")},e})();m=r.b([Object(n.o)({selector:"app-hero",template:o("BPDb"),styles:[o("gkPe")]}),r.d("design:paramtypes",[h.a,s.a,s.c,c.a,u.a])],m);var l=o("NVOs"),p=(function(){function e(e,t,o){this.heroesRepository=e,this.tabsService=t,this.fb=o,this.offsetCounter=0}return e.prototype.ngOnInit=function(){var e=this;this.createForm(),this.subscribeOnSearch(),this.heroesRepository.fetchHeroes().do((function(){return e.offsetCounter+=23})).subscribe((function(t){return e.heroes=t}))},e.prototype.selectHero=function(e){this.tabsService.openNewTab({route:"heroes/entity/"+e.id,name:""+e.name})},e.prototype.loadNext=function(){var e=this;this.heroesRepository.fetchHeroes({params:{offset:this.offsetCounter}}).do((function(){return e.offsetCounter+=23})).distinctUntilChanged().subscribe((function(t){return e.heroes=e.heroes.concat(t)}))},e.prototype.createForm=function(){this.form=this.fb.group({search:[""]})},e.prototype.findHeroes=function(){var e=this,t=this.form.controls.search.value;this.heroesRepository.findHeroes(t).subscribe((function(t){return e.heroes=t}))},e.prototype.subscribeOnSearch=function(){var e=this;this.form.controls.search.valueChanges.debounceTime(800).distinctUntilChanged().switchMap((function(t){return e.heroesRepository.findHeroes(t)})).subscribe((function(t){return e.heroes=t}))},e})();p=r.b([Object(n.o)({selector:"app-hero-list",template:o("YJVx"),styles:[o("Jin3")]}),r.d("design:paramtypes",[h.a,c.a,l.a])],p);var d=[{path:"",component:p},{path:"entity/:id",component:m}],f=(function(){function e(){}return e})();f=r.b([Object(n.M)({imports:[s.d.forChild(d)],exports:[s.d]})],f);var b=o("fAE3");o.d(t,"HeroesModule",(function(){return g}));var g=(function(){function e(){}return e})();g=r.b([Object(n.M)({declarations:[p,m],imports:[b.a,i.b,f]})],g)},YJVx:function(e,t){e.exports='<form [formGroup]="form" class="search-form">\n    <app-search placeholder="Spider Man and etc." formControlName="search"></app-search>\n    <button class="search_button" (click)="findHeroes()">\n        <i class="icon icon_search"></i>\n    </button>\n</form>\n<ul class="hero-list">\n    <ng-container *ngIf="heroes && heroes?.length !== 0; else empty">\n        <li class="hero__item hero__about__link" *ngFor="let hero of heroes" (click)="selectHero(hero)">\n            <div class="hero__preview">\n                <picture class="hero__picture" *ngIf="hero?.thumbnail">\n                    <source [srcset]="hero?.thumbnail?.path + \'/standard_fantastic.\' + hero?.thumbnail?.extension" media="(min-width: 768px)">\n                    <source [srcset]="hero?.thumbnail?.path + \'/standard_xlarge.\' + hero?.thumbnail?.extension" media="(min-width: 425px)">\n                    <source [srcset]="hero?.thumbnail?.path + \'/standard_medium.\' + hero?.thumbnail?.extension" media="(min-width: 100px)">\n                    <img class="image" [src]="hero?.thumbnail?.path + \'.\' + hero?.thumbnail?.extension" [alt]="hero?.name">\n                </picture>\n            </div>\n            <p class="hero__about">\n                <span>{{hero?.name}}</span>\n            </p>\n        </li>\n    </ng-container>\n</ul>\n<div class="list__footer">\n    <button title="load more" class="next-button" (click)="loadNext()"></button>\n</div>\n\n<ng-template #empty>\n    <h2>Sorry, no comics found :(</h2>\n</ng-template>'},gkPe:function(e,t,o){var r=o("yI9g");e.exports="string"==typeof r?r:r.toString()},yI9g:function(e,t,o){t=e.exports=o("FZ+f")(void 0),t.push([e.i,'.hero-title{text-align:center}.hero-content{margin-top:2rem;display:flex}.hero-cover{min-width:30%;margin-right:2rem}@media screen and (max-width:414px){.hero-cover{min-width:100%;margin-right:0}.hero-content{flex-direction:column;align-items:center}}.hero-description{text-indent:3rem;line-height:1.5}.hero-details{margin-top:3rem}.block{margin-bottom:2.5rem}.block:last-of-type{margin-bottom:0}.block__header{text-decoration:underline}.block__content{margin-top:1.5rem;display:flex;flex-wrap:wrap}.comic__link{margin-right:1.5rem;display:flex;flex-direction:column;align-items:center;margin-bottom:1.5rem;width:30%}.comic__link:focus,.comic__link:hover{color:#ff1414}.comic__link:last-of-type{margin-right:0}@media screen and (max-width:640px){.comic__link{width:45%}}@media screen and (max-width:400px){.comic__link{width:100%}}.favourite{position:relative}.favourite:hover:after{bottom:0;transform:translate(-50%,110%);left:50%;position:absolute;font-size:1.2rem;padding:.6rem 1rem;color:#eee;background-color:rgba(0,0,0,.8);border:1px solid #750012}.favourited{color:#ff1414}.favourited:hover:after{content:"remove favourite"}.unfavourited{color:#fff}.unfavourited:hover:after{content:"add favourite"}',""])}});