import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudImgComponent } from './cloud-img.component';

describe('CloudImgComponent', () => {
  let component: CloudImgComponent;
  let fixture: ComponentFixture<CloudImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
