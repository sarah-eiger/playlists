import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let store: MockStore;
  const initialState = {user: null};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({initialState}),
      ],
      declarations: [AccountComponent],
      imports: [],
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);   
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
