import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeeperOrdersComponent } from './keeper-orders.component';

describe('KeeperOrdersComponent', () => {
  let component: KeeperOrdersComponent;
  let fixture: ComponentFixture<KeeperOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeeperOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeeperOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
