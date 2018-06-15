import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from './hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public hero: Hero;
  public heroes: Hero[];
  public selectedHero: Hero;

  constructor(private heroService: HeroService) { 
    this.hero = new Hero(1 ,'Windstorm');
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
                      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
