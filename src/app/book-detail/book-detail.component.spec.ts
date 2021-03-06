import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookDetailComponent } from './book-detail.component';
import { FormsModule } from '@angular/forms';
import { RestApiService } from "../rest-api.service";
import { HttpClientModule } from '@angular/common/http';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
	  imports: [ RouterTestingModule, FormsModule, HttpClientModule ],
      declarations: [ BookDetailComponent ],
	  providers: [RestApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should display a message says "there is no book detail yet!".', async(() => {
    const fixture = TestBed.createComponent(BookDetailComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('There is no book detail yet!');
  }));
  
  it('should allow us to set ISBN value in input field', async(() => {
    setInputValue('#text1', '9789000010134');
	fixture.whenStable().then(() => {
		expect(component.ISBN).toEqual('9789000010134');
	});
  }));

  function setInputValue(selector: string, value: string) {
    fixture.detectChanges();
    let input = fixture.debugElement.nativeElement.querySelector('input');
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
  
  it('should call "getBookData" method', async(() => {
	spyOn(component, 'getBookData');
	let button = fixture.debugElement.nativeElement.querySelector('button');
	button.click();
	fixture.whenStable().then(() => {
		expect(component.getBookData).toHaveBeenCalled();
	});
  }));
});
