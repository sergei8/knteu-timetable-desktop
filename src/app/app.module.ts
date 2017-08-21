import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BannerComponent} from './banner/banner.component';
import {SocialiconsComponent} from './header/socialicons.component';

import {DialogueStudentComponent} from './dialog/studentmodal/dialogue.component';
import {BodystudentComponent} from './dialog/studentmodal/bodystudent.component';
import {StudentbuttonComponent} from './banner/buttons/studentbutton.component';
import {TeacherbuttonComponent} from './banner/buttons/teacherbutton.component';
import {AuditoriabuttonComponent} from './banner/buttons/auditoriabutton.component';

import {DataService} from "./data.service";
import {StudentTimetableComponent} from './student-timetable/student-timetable.component';

import {TeachermodalComponent} from './dialog/teachermodal/teachermodal.component';
import {BodyteacherComponent} from './dialog/teachermodal/bodyteacher.component';

import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {TypeaheadModule} from 'ng2-bootstrap/typeahead';
import {TooltipModule} from 'ng2-bootstrap/tooltip';
import {TeacherTimetableComponent} from './teacher-timetable/teacher-timetable.component';
import {AuditoriaTimetableComponent} from './auditoria-timetable/auditoria-timetable.component';
import {CorpusListComponent} from './auditoria-timetable/corpus-list/corpus-list.component';

import {ModalModule} from 'ng2-bootstrap';
import { RoomTimetableComponent } from './room-timetable/room-timetable.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    SocialiconsComponent,
    BodystudentComponent,
    StudentbuttonComponent,
    DialogueStudentComponent,
    TeacherbuttonComponent,
    AuditoriabuttonComponent,
    StudentTimetableComponent,
    TeachermodalComponent,
    BodyteacherComponent,
    TeacherTimetableComponent,
    AuditoriaTimetableComponent,
    CorpusListComponent,
    RoomTimetableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2Bs3ModalModule,
    TypeaheadModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [DataService],  // class will shown from all components !
  bootstrap: [AppComponent]
})
export class AppModule {
}
