import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowTransposeComponent } from './row-transpose.component';

describe('RowTransposeComponent', () => {
  let component: RowTransposeComponent;
  let fixture: ComponentFixture<RowTransposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RowTransposeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RowTransposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
