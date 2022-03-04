import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowPlayersComponent } from './dialog-show-players.component';

describe('DialogShowPlayersComponent', () => {
  let component: DialogShowPlayersComponent;
  let fixture: ComponentFixture<DialogShowPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogShowPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
