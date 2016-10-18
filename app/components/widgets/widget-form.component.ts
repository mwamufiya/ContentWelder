import { Component, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { Widget  } from './widget.component';
import { QuestionService  } from '../forms/question.service';
import { QuestionBase  } from '../forms/question-base';
import { TextboxQuestion  } from '../forms/question-textbox';
import { DropdownQuestion  } from '../forms/question-dropdown';
import { DesignerGlobalsService } from '../../services/designer-globals.service';

@Component({
  selector: 'designer-form',
  templateUrl: './app/components/widgets/widget-form.component.html',
  styleUrls: ['./app/components/widgets/widget-form.component.css']
})
export class FormWidget extends Widget{
    questions:any[];
    questionService: QuestionService;
    editQuestion:boolean;
    model: QuestionBase<any>;

    constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef,
        changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService,
        questionService: QuestionService){
        super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
        this.questionService = questionService;

        //this.questions = questionService.getQuestions();
        this.getQuestions();
        this.isSelected = true; 
    }
    getQuestions(){
        this.questions = this.questionService.getJSONQuestions().map( (json) => {
            let q:QuestionBase<any>;
            switch(json.controlType){
                case "dropdown":
                    q = new DropdownQuestion(json.options); 
                    break;
                case "textbox":
                    q = new TextboxQuestion(json.options);
                    break;
            }
            return q;
        });
    }
    displayQuestionProperties(){
        this.editQuestion= true;
        //TODO set the currently selected question
    }
    //Adds a new question based on teh selected items
    saveQuestionChanges(){

    }
    //Change or Create question type based on provided selection
    changeQuestionType(qType:string){
        //save existing set of options in case we need to change the type of question
        let options = {};
        if(this.model){
            //TODO: add logic to save parameters when switching question types
        }

        let uniqueID = `cw_formField_${this.questions.length}`;
        console.log(options);
        
        switch(qType.toLowerCase()){
            case "textbox":
                this.model = new TextboxQuestion({
                    key: uniqueID,
                    label: '[Input]',
                    type: 'text'
                });
                break;
            case "dropdown":
                this.model = new DropdownQuestion(options);
                break;
        }
        console.log(this.model);
        this.questions.push(this.model);
    }
    updateQuestions(){
        this.questions.splice(0,1);
    }
}