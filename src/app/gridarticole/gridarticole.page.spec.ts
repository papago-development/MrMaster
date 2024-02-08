import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridarticolePage } from './gridarticole.page';

describe('GridarticolePage', () => {
  let component: GridarticolePage;
  let fixture: ComponentFixture<GridarticolePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GridarticolePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
