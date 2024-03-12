import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossTab2Component } from './cross-tab2.component';

describe('CrossTab2Component', () => {
  let component: CrossTab2Component;
  let fixture: ComponentFixture<CrossTab2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrossTab2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrossTab2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
