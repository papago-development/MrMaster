import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetariPage } from './setari.page';

describe('SetariPage', () => {
  let component: SetariPage;
  let fixture: ComponentFixture<SetariPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SetariPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
