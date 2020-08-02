import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationRequestRemoveComponent } from './publication-request-remove.component';

describe('PublicationRequestRemoveComponent', () => {
  let component: PublicationRequestRemoveComponent;
  let fixture: ComponentFixture<PublicationRequestRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationRequestRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationRequestRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
