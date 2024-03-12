import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossTab1Component } from './cross-tab1.component';

describe('CrossTab1Component', () => {
  let component: CrossTab1Component;
  let fixture: ComponentFixture<CrossTab1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrossTab1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrossTab1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
