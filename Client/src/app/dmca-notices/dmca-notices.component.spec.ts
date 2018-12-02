import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmcaNoticesComponent } from './dmca-notices.component';

describe('DmcaNoticesComponent', () => {
  let component: DmcaNoticesComponent;
  let fixture: ComponentFixture<DmcaNoticesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmcaNoticesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmcaNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
