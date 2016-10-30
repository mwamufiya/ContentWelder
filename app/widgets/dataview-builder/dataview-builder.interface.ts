import { EventEmitter } from '@angular/core';
import Builder = webdriver.Builder;
export interface BuilderConfig{
    builderType: string;
    settings?:{};
    dataViewFinished?:EventEmitter<any>;
    name?:string;
    desc?:string;
}

export interface DataViewBuilder_I{
    toJson():BuilderConfig;
    parseConfig(builderConfig: BuilderConfig);

}

export interface DataViewBuilderService_I{
    fetch(builderConfig: BuilderConfig):Promise<JSON>;
}