import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificAvizPage } from './modific-aviz.page';

describe('ModificAvizPage', () => {
  let component: ModificAvizPage;
  let fixture: ComponentFixture<ModificAvizPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificAvizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
