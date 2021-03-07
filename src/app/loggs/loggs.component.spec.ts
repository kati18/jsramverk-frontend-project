import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggsComponent } from './loggs.component';

describe('LoggsComponent', () => {
  let component: LoggsComponent;
  let fixture: ComponentFixture<LoggsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
