import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvizePage } from './avize.page';

describe('AvizePage', () => {
  let component: AvizePage;
  let fixture: ComponentFixture<AvizePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AvizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
