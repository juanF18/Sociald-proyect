import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationRemoveComponent } from './publication-remove.component';

describe('PublicationRemoveComponent', () => {
  let component: PublicationRemoveComponent;
  let fixture: ComponentFixture<PublicationRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
