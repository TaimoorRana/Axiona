import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserComponent } from './edit-axiona.caponent';
import { MaterialsModule } from '../../../modules/materials.module';
import { UserService } from '../../../services/user.service';
import { MockUserService } from '../../../services/mocks/MockUserService';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserComponent ],
      imports: [ MaterialsModule ],
      providers: [ { provide: UserService, useClass: MockUserService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    component.user = {
      'role': 'admin',
      '_id': '5a7b95c49a80678d70defa7e',
      'email': 'test@axiona.ca',
      'name': 'Test',
      'pronouns': 'they'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
