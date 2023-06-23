import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPartnersComponent } from './crud-partners.component';

describe('CrudPartnersComponent', () => {
  let component: CrudPartnersComponent;
  let fixture: ComponentFixture<CrudPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudPartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
