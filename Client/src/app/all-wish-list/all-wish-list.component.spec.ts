import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWishListComponent } from './all-wish-list.component';

describe('AllWishListComponent', () => {
  let component: AllWishListComponent;
  let fixture: ComponentFixture<AllWishListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllWishListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
