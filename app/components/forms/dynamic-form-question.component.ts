import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { QuestionBase }     from './question-base';
@Component({
  moduleId: module.id,
  selector: 'df-question',
  templateUrl: 'dynamic-form-question.component.html',
  styleUrls: [`dynamic-form-question.component.css`]
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() {return this.form.controls[this.question.key].valid;}
}
