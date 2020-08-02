import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillRemoveComponent } from './skill-remove.component';

describe('SkillRemoveComponent', () => {
  let component: SkillRemoveComponent;
  let fixture: ComponentFixture<SkillRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
