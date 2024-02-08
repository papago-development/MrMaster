import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SituatiePage } from './situatie.page';

describe('SituatiePage', () => {
  let component: SituatiePage;
  let fixture: ComponentFixture<SituatiePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SituatiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
