import { Injectable }       from '@angular/core';
import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';
@Injectable()
export class QuestionService {
  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getQuestions() {
    let questions: QuestionBase<any>[] = [
      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),
      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        required: true,
        type: 'text',
        placeholder: 'John Doe',
        order: 1
      }),
      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];
    return questions.sort((a, b) => a.order - b.order);
  }
  getJSONQuestions() {
    let questions = [
      { 
        controlType: 'dropdown',
        options: {
          key: 'brave',
          label: 'Bravery Rating',
          options: [
            {key: 'solid',  value: 'Solid'},
            {key: 'great',  value: 'Great'},
            {key: 'good',   value: 'Good'},
            {key: 'unproven', value: 'Unproven'}
          ],
          order: 3
        }
      },
      {
        controlType: 'textbox',
        options: {
          key: 'firstName',
          label: 'First name',
          required: true,
          type: 'text',
          placeholder: 'John Doe',
          order: 1
        }
      },
      {
        controlType:'textbox',
        options: {
          key: 'emailAddress',
          label: 'Email',
          type: 'email',
          order: 2
        }
      }
    ];
    return questions.sort((a, b) => a.options.order - b.options.order);
  }
  getNewQuestionform() {
    let questions: QuestionBase<any>[] = [
      new DropdownQuestion({
        key: 'controlType',
        label: 'Type',
        options: [
          {key: 'Text',  value: 'textbox'},
          {key: 'DropDown',  value: 'dropdown'},
        ],
        order: 1
      }),
      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        required: true,
        type: 'text',
        placeholder: 'John Doe',
        order: 1
      }),
      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];
    return questions.sort((a, b) => a.order - b.order);
  }
}
