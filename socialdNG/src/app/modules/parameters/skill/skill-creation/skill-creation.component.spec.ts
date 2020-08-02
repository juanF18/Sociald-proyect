import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCreationComponent } from './skill-creation.component';

describe('SkillCreationComponent', () => {
  let component: SkillCreationComponent;
  let fixture: ComponentFixture<SkillCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
