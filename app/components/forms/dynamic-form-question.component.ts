import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { QuestionBase }     from './question-base';
@Component({
  moduleId: module.id,
  selector: 'df-question',
  templateUrl: 'dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() {
    /*console.log(`------------------`);
    console.log(this.form.controls);
    console.log(this.question.key);
    console.log(this.form.controls[this.question.key]); */
    return this.form.controls[this.question.key].valid;
   }
}
