import { Component, Input, OnInit, EventEmitter }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';
@Component({
  moduleId: module.id,
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  providers: [ QuestionControlService ],
  outputs: ['onSubmit', 'actionRequested'],
  styles: [`
    .fieldMenu{
      float:right;
      display:none;
    }
    .fieldMenu i{
      cursor:pointer;
    }
    .form-row:hover .fieldMenu{
      display:block;
    }
  `]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  onSubmit:EventEmitter<any> = new EventEmitter();
  actionRequested:EventEmitter<any> = new EventEmitter;
  form: FormGroup;
  payLoad = '';
  constructor(private qcs: QuestionControlService) {  }
  ngOnInit() {
    if(this.questions && this.questions.length)
      this.form = this.qcs.toFormGroup(this.questions);
  }
  handleSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    this.onSubmit.emit(this.payLoad);
  }
  requestAction(index:number, action:string){
    this.actionRequested.emit({
      index: index,
      action: action
    })
  }
  addQuestion(qList:QuestionBase<any>[]){

    qList.forEach( (q:QuestionBase<any>) => {
      let v = this.qcs.toFormControl(q);
      this.form.addControl(q.key, v);
    });
  }
}
