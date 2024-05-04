import { ComponentFixture, TestBed } from '@angular/core/testing';

import { pageNotFoundComponent } from './page-not-found.component';

describe('404Component', () => {
  let component: pageNotFoundComponent;
  let fixture: ComponentFixture<pageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [pageNotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(pageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
