import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PunctDeLucruDetailsPage } from './punct-de-lucru-details.page';

describe('PunctDeLucruDetailsPage', () => {
  let component: PunctDeLucruDetailsPage;
  let fixture: ComponentFixture<PunctDeLucruDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PunctDeLucruDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
