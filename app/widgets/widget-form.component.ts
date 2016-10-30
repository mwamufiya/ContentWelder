import { Component, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef,
     ViewChild, forwardRef, HostListener, OnDestroy } from '@angular/core';
import { Widget  } from './widget.component';
import { QuestionService  } from '../forms/question.service';
import { QuestionBase  } from '../forms/question-base';
import { TextboxQuestion  } from '../forms/question-textbox';
import { DropdownQuestion  } from '../forms/question-dropdown';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { DynamicFormComponent } from '../forms/dynamic-form.component';
import { Parent } from './parent';
import { WidgetConfig } from './widget.interface';

@Component({
    moduleId: module.id,
  selector: 'designer-form',
  templateUrl: 'widget-form.component.html',
  styleUrls: ['widget-form.component.css'],
    inputs: ['widgetConfig'],
  providers: [
      {
          provide: Parent,
          useExisting: forwardRef(() => FormWidget)
      }
  ]
})
export class FormWidget extends Widget implements OnDestroy{
    questions:any[];
    questionService: QuestionService;
    editQuestion:boolean;
    curModel: QuestionBase<any>;
    @ViewChild(DynamicFormComponent) private dynForm: DynamicFormComponent;
    widgetType:string = 'formwidget';

    constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef,
        changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService,
        questionService: QuestionService){
        super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
        this.questionService = questionService;
    }
    @HostListener('click', ['$event']) onclick(event):boolean{
        return super.onclick(event);
    }
    getQuestions(){
        let qList = this.widgetConfig['questions'];
        //Do nothing if there are no questions to process
        if(!qList || !qList.length) {
            this.questions = [];
            return;
        }

        this.questions = qList.map( json => {
           let q: QuestionBase<any>;
            switch(json['controlType'].trim().toLowerCase()){
                case 'dropdown':
                    q = new DropdownQuestion(json);
                    break;
                case 'textbox':
                    q = new TextboxQuestion(json);
                    break;
            }
            return q;
        });
    }
    addQuestion(){
        this.curModel = null;
        this.displayQuestionProperties();
    }
    displayQuestionProperties(question?:QuestionBase<any>):void{
        this.editQuestion= true;
        if(question)
            this.curModel = question;
    }
    //Save changes and close the Field modifier
    saveQuestionChanges():void{
        //Since we have 2 way binding already having updated our values
        //All we need to do is clear out the current model.
        this.hideFieldProperties();
    }
    hideFieldProperties(){
        this.curModel = null;
        this.editQuestion = null 
    }
    //Remove the currently selected Questions
    removeCurrentModel():void{
        //If there is a currently selected mode, we remove it
        if(this.curModel){
            let index = this.questions.indexOf(this.curModel);
            if(index!=null)
                this.questions.splice(index, 1);
        }
        //Now we hide the panel
        this.hideFieldProperties();
    }
    //Change or Create question type based on provided selection
    changeQuestionType(qType:string){
        //save existing set of options in case we need to change the type of question
        let options = {};
        if(this.curModel){
            //TODO: add logic to save parameters when switching question types
        }else{

            //TODO: this method of generating unique IDs based on # of questions is prone to error
            //Add a method that loops through existing fields to ensure uniqueID is obtained
            let id = this.questions? this.questions.length : 0;
            let uniqueID = `cw_formField_${id}`;
            let uniqueLabel = `[Field_${id}]`;
            
            switch(qType.toLowerCase()){
                case "textbox":
                    this.curModel = new TextboxQuestion({
                        key: uniqueID,
                        label: uniqueLabel,
                        type: 'text'
                    });
                    break;
                case "dropdown":
                    this.curModel = new DropdownQuestion({
                        key: uniqueID,
                        label: uniqueLabel
                    });
                    break;
            }
            //We first need to att the control before adding it to the list
            //Otherwise, change detection will throw erros because the form doesn't match the list
            //TODO: probably want to move this into the DynamicFormComponent 
            //      so that external classes don't need to be aware of it's limitations
            if(this.questions && this.questions.length){
                this.dynForm.addQuestion(new Array(this.curModel));
                this.questions.push(this.curModel);
            }else
                this.questions = [this.curModel]
        }
    }
    updateQuestions(){
        this.questions.splice(0,1);
    }
    //Ensures that only 
    cleanFieldName(event:Event){
        let e = event.target as HTMLInputElement;
        let exp = new RegExp('[^a-zA-Z_0-9\\s]+');
        e.value = e.value.replace(exp, '');
        
    }
    getOptionsAsString():string{
        if(!this.curModel || this.curModel.controlType!='dropdown')
            return null;
        
        let m = this.curModel as DropdownQuestion;
        let optionList = [];
        m.options.forEach( option => {
                optionList.push(option.value) 
            });
        return optionList.join(', ');
    }
    setOptions(event:Event):void{
        //Assumes we're are dealing with a DropDown control
        if(!this.curModel || this.curModel.controlType!='dropdown')
            return;

        //TODO review angular forms to see if there is a better way of achieving this.
        let m = this.curModel as DropdownQuestion;
        let e = event.target as HTMLInputElement;
        m.options = [];
        e.value.split(',').forEach ( v => {
            m.options.push({
                key: v.trim(),
                value: v.trim()
            });
        })
    }
    //Handle an action request from the underlying DynamicFormComponent
    handleDynaCompAction(jsonReq):void{
        let index = jsonReq.index;

        switch(jsonReq.action.toLowerCase()){
            case 'remove':
                this.questions.splice(index, 1);
                break;
            case 'edit':
                this.displayQuestionProperties(this.questions[index]);
                break;
        }

    }
    //Help method for template since Bitwise operators are not supported in Angular 2 yet
    isEmpty():boolean{
        return !this.questions || !this.questions.length
    }
    enableQuestionProperties():boolean{
        return this.editQuestion==true && this.isSelected==true
    }

    /**
     * @function
     * @desc returns a JSON representation of the current Widget Object
     */
    toJson():WidgetConfig{
        //let Base class do the bulk of the work
        let json = super.toJson();

        //Handle Page specific logic
        if(!this.isEmpty())
            json['questions'] = this.questions;

        return json;
    }
    /**
     * @function
     * @desc handles creating any child widget components
     */
    parseWidgetConfig(config?: WidgetConfig){
        //Allows configuration to be set outside of OnInit.
        if(config) this.widgetConfig = config;

        //Do nothing if no widget config was provided
        if(!this.widgetConfig)
            return;

        //First let the base class handle all common areas
        super.parseWidgetConfig(this.widgetConfig);

        //now process the Form Questions
        let qList = this.widgetConfig['questions'];
        if(qList && qList.length)
            this.getQuestions();

    }

    /**
     * @function
     * @description calls the base class to handle removal action
     */
    ngOnDestroy():void{
        super.ngOnDestroy();
    }
}