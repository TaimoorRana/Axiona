import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPhonelogComponent } from './edit-phonelog.component';
import { PhonelogService } from '../../../services/phonelog.service';
import { MockPhonelogService } from '../../../services/mocks/MockPhonelogService';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchPipe } from '../../../pipes/search.pipe';
import { MaterialsModule } from '../../../modules/materials.module';
import { UserService } from '../../../services/user.service';
import { MockUserService } from '../../../services/mocks/MockUserService';


describe('EditPhonelogComponent', () => {
  let component: EditPhonelogComponent;
  let fixture: ComponentFixture<EditPhonelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPhonelogComponent ],
      imports: [MaterialsModule],
      providers: [
        { provide: PhonelogService, useClass: MockPhonelogService },
        { provide: UserService, useClass: MockUserService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhonelogComponent);
    component = fixture.componentInstance;
    component.log = {
    'name': 'testing',
    'pronouns': 'him',
    'user': 'random',
    'urgent': true,
    'message': 'testing',
    'phonenumber': '514632182',
    'language': 'english',
    'subject': 'test',
    'callertype': 'test',
    'date': '2018-01-27T15:53:03.674Z',
    'assignedTo': '1456789100099'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
