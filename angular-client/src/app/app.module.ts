import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from './modules/materials.module';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { ActiveCasefilesComponent } from './components/casefiles/active-casefiles/active-casefiles.component';
import { ActivityComponent } from './components/dashboard/activity/activity.component';
import { AddParticipantComponent } from './components/participants/add-participant/add-participant.component';
import { AddPhonelogComponent } from './components/phonelog/add-phonelog/add-phonelog.component';
import { AddResourceComponent } from './components/resources/add-resource/add-resource.component';
import { AlertModalComponent } from './components/modals/alert-modal/alert-modal.component';
import { AssignUsersModalComponent } from './components/users/assign-users-modal/assign-users-modal.component';
import { CasefilesComponent } from './components/casefiles/casefiles.component';
import { CaseModalComponent } from './components/casefiles/case-modal/case-modal.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentModalComponent } from './components/documents/document-modal/document-modal.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { EditParticipantComponent } from './components/participants/edit-participant/edit-participant.component';
import { EditPhonelogComponent } from './components/phonelog/edit-phonelog/edit-phonelog.component';
import { EditResourceComponent } from './components/resources/edit-resource/edit-resource.component';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NoteModalComponent } from './components/notes/note-modal/note-modal.component';
import { NotesComponent } from './components/notes/notes.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { ParticipantProfileComponent } from './components/participants/participant-profile/participant-profile.component';
import { PhonelogComponent } from './components/phonelog/phonelog.component';
import { PhonelogModalComponent } from './components/phonelog/phonelog-modal/phonelog-modal.component';
import { PhonelogTabComponent } from './components/phonelog/phonelog-tab/phonelog-tab.component';
import { RegisterUserComponent } from './components/users/register-user/register-user.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TrashbinComponent } from './components/trashbin/trashbin.component';
import { UsersComponent } from './components/users/users.component';
import { ViewPhonelogComponent } from './components/phonelog/view-phonelog/view-phonelog.component';
import { ViewParticipantsComponent } from './components/participants/view-participants/view-participants.component';
import { ViewResourcesComponent } from './components/resources/view-resources/view-resources.component';
import { ViewUsersComponent } from './components/users/view-users/view-users.component';

import { AuthenticationService } from './services/authentication.service';
import { CasefileService } from './services/casefile.service';
import { MessageService } from './services/message.service';
import { ParticipantService } from './services/participant.service';
import { PhonelogService } from './services/phonelog.service';
import { ResourceService } from './services/resource.service';
import { UserService } from './services/user.service';
import { TrashService } from './services/trash.service';
import { TaskService } from './services/task.service';
import { ReportPhonelogService } from './services/reports-phonelog.service';

import { OrderByPipe } from './pipes/orderBy.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/activity',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'activity',
        pathMatch: 'full'
      },
      {
        path: 'activity',
        component: ActivityComponent
      },
      {
        path: 'tasks',
        component: TasksComponent
      },
      {
        path: 'active-casefiles',
        component: ActiveCasefilesComponent
      },
      {
        path: 'phonelog',
        component: PhonelogComponent,
        children: [
          {
            path: '',
            redirectTo: 'view-phonelog',
            pathMatch: 'full'
          },
          {
            path: 'phonelog-tab',
            component: PhonelogTabComponent
          },
          {
            path: 'view-phonelog',
            component: ViewPhonelogComponent
          }
        ]
      },
      {
        path: 'users',
        component: UsersComponent,
        children: [
          {
            path: '',
            redirectTo: 'view-users',
            pathMatch: 'full'
          },
          {
            path: 'register-user',
            component: RegisterUserComponent
          },
          {
            path: 'view-users',
            component: ViewUsersComponent
          }
        ]
      },
      {
        path: 'reports',
        component: ReportsComponent
      },
      {
        path: 'trashbin',
        component: TrashbinComponent
      },
    ]
  },
  {
    path: 'participants',
    component: ParticipantsComponent,
    children: [
      {
        path: '',
        redirectTo: 'view-participants',
        pathMatch: 'full'
      },
      {
        path: 'add-participant',
        component: AddParticipantComponent
      },
      {
        path: 'view-participants',
        component: ViewParticipantsComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'resources',
    component: ResourcesComponent,
    children: [
      {
        path: '',
        redirectTo: 'view-resources',
        pathMatch: 'full'
      },
      {
        path: 'add-resource',
        component: AddResourceComponent
      },
      {
        path: 'view-resources',
        component: ViewResourcesComponent
      }
    ]
  },
  {
    path: 'participant-profile/:_id',
    component: ParticipantProfileComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ActiveCasefilesComponent,
    ActivityComponent,
    AddParticipantComponent,
    AddPhonelogComponent,
    AddResourceComponent,
    AlertModalComponent,
    AssignUsersModalComponent,
    CasefilesComponent,
    CaseModalComponent,
    ConfirmModalComponent,
    DashboardComponent,
    DocumentModalComponent,
    DocumentsComponent,
    EditParticipantComponent,
    EditPhonelogComponent,
    EditResourceComponent,
    LoginComponent,
    MessagesComponent,
    NoteModalComponent,
    NotesComponent,
    ParticipantProfileComponent,
    ParticipantsComponent,
    PhonelogComponent,
    PhonelogModalComponent,
    PhonelogTabComponent,
    RegisterUserComponent,
    ReportsComponent,
    ResourcesComponent,
    TasksComponent,
    TrashbinComponent,
    UsersComponent,
    ViewParticipantsComponent,
    ViewPhonelogComponent,
    ViewResourcesComponent,
    ViewUsersComponent,
    OrderByPipe,
    SearchPipe,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,
    MaterialsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  entryComponents: [
    AlertModalComponent,
    AssignUsersModalComponent,
    CaseModalComponent,
    ConfirmModalComponent,
    DocumentModalComponent,
    NoteModalComponent,
    PhonelogModalComponent
  ],
  providers: [
    ParticipantService,
    MessageService,
    ResourceService,
    CasefileService,
    UserService,
    AuthenticationService,
    PhonelogService,
    TaskService,
    TrashService,
    ReportPhonelogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
