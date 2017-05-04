import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRectangleComponent } from './game-rectangle.component';

describe('GameRectangleComponent', () => {
  let component: GameRectangleComponent;
  let fixture: ComponentFixture<GameRectangleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameRectangleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRectangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
