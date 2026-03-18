import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWarehouseDetailComponent } from './product-warehouse-detail.component';

describe('ProductWarehouseDetailComponent', () => {
  let component: ProductWarehouseDetailComponent;
  let fixture: ComponentFixture<ProductWarehouseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductWarehouseDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductWarehouseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
