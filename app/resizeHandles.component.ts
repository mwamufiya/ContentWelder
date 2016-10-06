import { Component } from '@angular/core';


@Component({
  selector: 'designer-resizeHandles',
  template: `
    <div class="resizerTL"></div>
    <div class="resizerTC"></div>
    <div class="resizerTR"></div>
    <div class="resizerCL"></div>
    <div class="resizerCR"></div>
    <div class="resizerBL"></div>
    <div class="resizerBC"></div>
    <div class="resizerBR"></div> 
  `,
  styles:[`
.resizerTL, .resizerTC, .resizerTR, .resizerCL, .resizerCR, .resizerBL, .resizerBC, .resizerBR {
  position: absolute;
  height:8px;
  width:8px;
  border:1px solid #CCC;
  background:white;
}
.resizerTL, .resizerTC, .resizerTR{
  top:-5px;
}
.resizerBL, .resizerBC, .resizerBR{
  bottom:-5px;
}
.resizerTR, .resizerCR, .resizerBR, .resizerCR{
  right:-5px;
}
.resizerTL, .resizerCL, .resizerBL, .resizerCL{
  left:-5px;
}
.resizerBL, .resizerTR{
  cursor:nesw-resize;
}
.resizerBR, .resizerTL{
  cursor:nwse-resize;
}
.resizerTC, .resizerBC{
  left:0;
  right:0;
  margin:auto;
  cursor:ns-resize;
}
.resizerCL, .resizerCR{
  margin:auto;
  top:0;
  bottom:0;
  cursor:ew-resize;
}
  `]
})
export class ResizeHandles{
    
}