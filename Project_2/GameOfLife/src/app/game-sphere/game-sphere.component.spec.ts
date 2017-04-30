import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSphereComponent } from './game-sphere.component';

describe('GameSphereComponent', () => {
  let component: GameSphereComponent;
  let fixture: ComponentFixture<GameSphereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSphereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
