import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = this.toFormControl(question); 
    });
    return new FormGroup(group);
  }
  toFormControl(question: QuestionBase<any>):FormControl{
    return question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
  }
}
