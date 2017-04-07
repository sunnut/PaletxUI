import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'tooltip.html',
  styleUrls: ['tooltip.css']
})

export class PxTooltipDemoComponent {
  tooltipCode1: string = `<a pxTooltip="prompt text" placement="top">Top</a>`;
  tooltipCode2: string = `<a tooltipType="textType"
     pxTooltip="针对一些稀有名词/动词，标签文案不能让用户直观明白理解的，鼠标移入出现气泡框，显示对其描述的文案内容"
     placement="top">Top</a>`;
}
