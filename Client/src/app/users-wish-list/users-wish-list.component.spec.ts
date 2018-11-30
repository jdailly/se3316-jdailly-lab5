import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersWishListComponent } from './users-wish-list.component';

describe('UsersWishListComponent', () => {
  let component: UsersWishListComponent;
  let fixture: ComponentFixture<UsersWishListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersWishListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersWishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
