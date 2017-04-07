import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'px-datetimepicker-demo',
  templateUrl: 'datetimepicker.html',
  styleUrls: ['datetimepicker.scss']
})
export class PxDateTimePickerDemoComponent {
  public date1: any;
  public date2: any;
  public date4: any;
  public pcode1: string = `<px-datetime [(ngModel)]="date1"></px-datetime>
<px-datetime [(ngModel)]="date2" [showTime]="true" [showSeconds]="true" ></px-datetime>
<px-datetime [(ngModel)]="date3" [timeOnly]="true" [showSeconds]="true"></px-datetime>`;
  public pcode2: string =
      `<px-datetime [(ngModel)]="dateValue" [locale]="en"></px-datetime>`;
  public pcode3: string = `export class MyModel {
    
    en: any;
    
    ngOnInit() {
        this.en = {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
            monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
        };
    }
}`;
}
