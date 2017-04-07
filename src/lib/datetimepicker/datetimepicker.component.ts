import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {EventEmitter, forwardRef, Output, Renderer, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {DomHandler} from 'primeng/components/dom/domhandler';

export const CALENDAR_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PxDateTimePicker),
  multi: true
};

export const CALENDAR_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => PxDateTimePicker),
  multi: true
};

export interface LocaleSettings {
  firstDayOfWeek?: number;
  dayNames: string[];
  dayNamesShort: string[];
  dayNamesMin: string[];
  monthNames: string[];
  monthNamesShort: string[];
}

@Component({
  selector: 'px-datetime',
  templateUrl: 'datetimepicker.html',
  styleUrls: ['../styles/datetimepicker.css'],
  animations: [trigger(
      'overlayState',
      [
        state('hidden', style({opacity: 0})),
        state('visible', style({opacity: 1})),
        transition('visible => hidden', animate('400ms ease-in')),
        transition('hidden => visible', animate('400ms ease-out'))
      ])],
  host: {
    '[class.ui-inputwrapper-filled]': 'filled',
    '[class.ui-inputwrapper-focus]': 'focus'
  },
  providers: [DomHandler, CALENDAR_VALUE_ACCESSOR, CALENDAR_VALIDATOR]
})
export class PxDateTimePicker implements AfterViewInit, OnInit, OnDestroy,
                                         ControlValueAccessor {
  @Input() defaultDate: Date;

  @Input() style: string;

  @Input() styleClass: string;

  @Input() placeholder: string;

  @Input() readonlyInput: boolean = false;

  @Input() showTime: boolean;

  @Input() timeOnly: boolean;

  @Input() showSeconds: boolean = false;

  @Input() required: boolean;

  // @Input() dataType: string = 'date';

  // @Input() inputStyle: string;

  // @Input() inputStyleClass: string;

  // @Input() disabled: any;

  // @Input() inline: boolean = false;

  // @Input() showOtherMonths: boolean = true;

  // @Input() selectOtherMonths: boolean;

  // @Input() showIcon: boolean;

  // @Input() icon: string = 'fa-calendar';

  // @Input() appendTo: any;

  // @Input() shortYearCutoff: any = '+10';

  // @Input() monthNavigator: boolean;

  // @Input() yearNavigator: boolean;

  // @Input() yearRange: string;

  // @Input() hourFormat: string = '24';

  // @Input() stepHour: number = 1;

  // @Input() stepMinute: number = 1;

  // @Input() stepSecond: number = 1;

  // @Input() showOnFocus: boolean = true;

  @Output() onFocus: EventEmitter<any> = new EventEmitter();

  @Output() onBlur: EventEmitter<any> = new EventEmitter();

  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  _locale: LocaleSettings = {
    firstDayOfWeek: 0,
    dayNames: ['日', '一', '二', '三', '四', '五', '六'],
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
    dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
    monthNames: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
      '十月', '十一月', '十二月'
    ],
    monthNamesShort: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
      '十月', '十一月', '十二月'
    ]
  };

  // @Input() tabindex: number;

  @ViewChild('datepicker') overlayViewChild: ElementRef;

  value: Date;

  dates: any[];

  weekDays: string[];

  currentMonthText: string;

  currentMonth: number;

  currentYear: number;

  currentHour: number;

  currentMinute: number;

  currentSecond: number;

  pm: boolean;

  overlay: HTMLDivElement;

  overlayVisible: boolean;

  closeOverlay: boolean = true;

  dateClick: boolean;

  onModelChange: Function = () => {};

  onModelTouched: Function = () => {};

  calendarElement: any;

  documentClickListener: any;

  ticksTo1970: number;

  yearOptions: number[];

  focus: boolean;

  filled: boolean;

  /*modify start*/
  icon: string = 'fa-calendar';
  showIcon: boolean = true;
  disabled: boolean = false;
  dateFormat: string = 'yy-mm-dd';
  yearNavigator: boolean = true;
  monthNavigator: boolean = true;
  hourFormat: string = '24';
  yearRange: string = '';
  inline: boolean = false;
  showOtherMonths: boolean = true;
  selectOtherMonths: boolean = false;
  showOnFocus: boolean = true;
  appendTo: any;
  shortYearCutoff: any = '+10';
  tabindex: number;
  stepHour: number = 1;
  stepMinute: number = 1;
  stepSecond: number = 1;
  dataType: string = 'date';
  yeardb: string = '年';
  /*modify end*/
  inputFieldValue: string = null;

  _minDate: Date;

  _maxDate: Date;

  _isValid: boolean = true;

  @Input()
  get minDate(): Date {
    return this._minDate;
  }

  set minDate(date: Date) {
    this._minDate = date;
    this.createMonth(this.currentMonth, this.currentYear);
  }

  @Input()
  get maxDate(): Date {
    return this._maxDate;
  }

  set maxDate(date: Date) {
    this._maxDate = date;
    this.createMonth(this.currentMonth, this.currentYear);
  }

  get locale() {
    return this._locale;
  }

  @Input()
  set locale(newLocale: LocaleSettings) {
    this._locale = newLocale;
    this.createWeekDays();
    this.createMonth(this.currentMonth, this.currentYear);
  }

  constructor(
      public el: ElementRef, public domHandler: DomHandler,
      public renderer: Renderer, private translateService: TranslateService) {}

  ngOnInit() {
    let date = this.defaultDate || new Date();
    this.createWeekDays();
    this.yeardb = this.translateService.currentLang == 'en' ? '' : '年';
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
    let tenyearago = this.currentYear - 10;
    let aftertenyear = this.currentYear + 10;
    this.yearRange = tenyearago + ':' + aftertenyear;
    if (this.showTime) {
      this.currentMinute = date.getMinutes();
      this.currentSecond = date.getSeconds();
      this.pm = date.getHours() > 11;

      if (this.hourFormat == '12') {
        this.currentHour = date.getHours() == 0 ? 12 : date.getHours() % 12;
      } else {
        this.currentHour = date.getHours();
      }
    }
    // else if (this.timeOnly) {
    if (this.timeOnly) {
      this.currentMinute = 0;
      this.currentHour = 0;
      this.currentSecond = 0;
    }

    this.createMonth(this.currentMonth, this.currentYear);

    this.ticksTo1970 =
        (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
          Math.floor(1970 / 400)) *
         24 * 60 * 60 * 10000000);

    if (this.yearNavigator && this.yearRange) {
      this.yearOptions = [];
      let years = this.yearRange.split(':'), yearStart = parseInt(years[0]),
          yearEnd = parseInt(years[1]);

      for (let i = yearStart; i <= yearEnd; i++) {
        this.yearOptions.push(i);
      }
    }
  }

  public ngAfterViewInit() {
    this.overlay = <HTMLDivElement>this.overlayViewChild.nativeElement;

    if (!this.inline && this.appendTo) {
      if (this.appendTo === 'body') {
        document.body.appendChild(this.overlay);
      } else {
        this.domHandler.appendChild(this.overlay, this.appendTo);
      }
    }
  }

  public createWeekDays() {
    this.weekDays = [];
    let dayIndex = this.locale.firstDayOfWeek;
    for (let i = 0; i < 7; i++) {
      this.weekDays.push(this.locale.dayNamesMin[dayIndex]);
      dayIndex = (dayIndex == 6) ? 0 : ++dayIndex;
    }
  }

  public createMonth(month: number, year: number) {
    this.dates = [];
    this.currentMonth = month;
    this.currentYear = year;
    this.currentMonthText = this.locale.monthNames[month];
    let firstDay = this.getFirstDayOfMonthIndex(month, year);
    let daysLength = this.getDaysCountInMonth(month, year);
    let prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
    // let sundayIndex = this.getSundayIndex();
    let dayNo = 1;
    let today = new Date();

    for (let i = 0; i < 6; i++) {
      let week = [];

      if (i == 0) {
        for (let j = (prevMonthDaysLength - firstDay + 1);
             j <= prevMonthDaysLength; j++) {
          let prev = this.getPreviousMonthAndYear(month, year);
          week.push({
            day: j,
            month: prev.month,
            year: prev.year,
            otherMonth: true,
            today: this.isToday(today, j, prev.month, prev.year),
            selectable: this.isSelectable(j, prev.month, prev.year)
          });
        }

        let remainingDaysLength = 7 - week.length;
        for (let j = 0; j < remainingDaysLength; j++) {
          week.push({
            day: dayNo,
            month: month,
            year: year,
            today: this.isToday(today, dayNo, month, year),
            selectable: this.isSelectable(dayNo, month, year)
          });
          dayNo++;
        }
      } else {
        for (let j = 0; j < 7; j++) {
          if (dayNo > daysLength) {
            let next = this.getNextMonthAndYear(month, year);
            week.push({
              day: dayNo - daysLength,
              month: next.month,
              year: next.year,
              otherMonth: true,
              today: this.isToday(
                  today, dayNo - daysLength, next.month, next.year),
              selectable:
                  this.isSelectable((dayNo - daysLength), next.month, next.year)
            });
          } else {
            week.push({
              day: dayNo,
              month: month,
              year: year,
              today: this.isToday(today, dayNo, month, year),
              selectable: this.isSelectable(dayNo, month, year)
            });
          }

          dayNo++;
        }
      }

      this.dates.push(week);
    }
  }

  public prevMonth(event: any) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }

    this.createMonth(this.currentMonth, this.currentYear);
    event.preventDefault();
  }

  public nextMonth(event: any) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }

    this.createMonth(this.currentMonth, this.currentYear);
    event.preventDefault();
  }

  public onDateSelect(event: any, dateMeta: any) {
    if (this.disabled || !dateMeta.selectable) {
      event.preventDefault();
      return;
    }

    if (dateMeta.otherMonth) {
      if (this.selectOtherMonths) {
        this.selectDate(dateMeta);
      }
    } else {
      this.selectDate(dateMeta);
    }

    this.dateClick = true;
    this.updateInputfield();
    event.preventDefault();
  }

  public updateInputfield() {
    if (this.value) {
      let formattedValue;

      if (this.timeOnly) {
        formattedValue = this.formatTime(this.value);
      } else {
        formattedValue = this.formatDate(this.value, this.dateFormat);
        if (this.showTime) {
          formattedValue += ' ' + this.formatTime(this.value);
        }
      }

      this.inputFieldValue = formattedValue;
    } else {
      this.inputFieldValue = '';
    }

    this.updateFilledState();
  }

  public selectDate(dateMeta: any) {
    this.value = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
    if (this.showTime) {
      if (this.hourFormat === '12' && this.pm && this.currentHour != 12) {
        this.value.setHours(this.currentHour + 12);
      } else {
        this.value.setHours(this.currentHour);
      }
      this.value.setMinutes(this.currentMinute);
      this.value.setSeconds(this.currentSecond);
    }
    this._isValid = true;
    this.updateModel();
    this.onSelect.emit(this.value);
  }

  public updateModel() {
    if (this.dataType == 'date') {
      this.onModelChange(this.value);
    } else if (this.dataType == 'string') {
      if (this.timeOnly) {
        this.onModelChange(this.formatTime(this.value));
      } else {
        this.onModelChange(this.formatDate(this.value, this.dateFormat));
      }
    }
  }

  public getFirstDayOfMonthIndex(month: number, year: number) {
    let day = new Date();
    day.setDate(1);
    day.setMonth(month);
    day.setFullYear(year);

    let dayIndex = day.getDay() + this.getSundayIndex();
    return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
  }

  public getDaysCountInMonth(month: number, year: number) {
    return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
  }

  public getDaysCountInPrevMonth(month: number, year: number) {
    let prev = this.getPreviousMonthAndYear(month, year);
    return this.getDaysCountInMonth(prev.month, prev.year);
  }

  public getPreviousMonthAndYear(month: number, year: number) {
    let m, y;

    if (month === 0) {
      m = 11;
      y = year - 1;
    } else {
      m = month - 1;
      y = year;
    }

    return {'month': m, 'year': y};
  }

  public getNextMonthAndYear(month: number, year: number) {
    let m, y;

    if (month === 11) {
      m = 0;
      y = year + 1;
    } else {
      m = month + 1;
    }

    return {'month': m, 'year': y};
  }

  public getSundayIndex() {
    return this.locale.firstDayOfWeek > 0 ? 7 - this.locale.firstDayOfWeek : 0;
  }

  public isSelected(dateMeta: any): boolean {
    if (this.value) {
      return this.value.getDate() === dateMeta.day &&
          this.value.getMonth() === dateMeta.month &&
          this.value.getFullYear() === dateMeta.year;
    } else {
      return false;
    }
  }

  public isToday(today: any, day: any, month: any, year: any): boolean {
    return today.getDate() === day && today.getMonth() === month &&
        today.getFullYear() === year;
  }

  public isSelectable(day: any, month: any, year: any): boolean {
    let validMin = true;
    let validMax = true;

    if (this.minDate) {
      if (this.minDate.getFullYear() > year) {
        validMin = false;
      } else if (this.minDate.getFullYear() === year) {
        if (this.minDate.getMonth() > month) {
          validMin = false;
        } else if (this.minDate.getMonth() === month) {
          if (this.minDate.getDate() > day) {
            validMin = false;
          }
        }
      }
    }

    if (this.maxDate) {
      if (this.maxDate.getFullYear() < year) {
        validMax = false;
      } else if (this.maxDate.getFullYear() === year) {
        if (this.maxDate.getMonth() < month) {
          validMax = false;
        } else if (this.maxDate.getMonth() === month) {
          if (this.maxDate.getDate() < day) {
            validMax = false;
          }
        }
      }
    }

    return validMin && validMax;
  }

  public onInputFocus(inputfield: any, event: any) {
    this.focus = true;
    if (this.showOnFocus) {
      this.showOverlay(inputfield);
    }
    this.onFocus.emit(event);
  }

  public onInputBlur(event: any) {
    this.focus = false;
    this.onBlur.emit(event);
    this.updateInputfield();
    this.onModelTouched();
  }

  public onButtonClick(event: any, inputfield: any) {
    this.closeOverlay = false;

    if (!this.overlay.offsetParent) {
      inputfield.focus();
      this.showOverlay(inputfield);
    } else {
      this.closeOverlay = true;
    }
  }

  public onInputKeydown(event: any) {
    if (event.keyCode === 9) {
      this.overlayVisible = false;
    }
  }

  public onMonthDropdownChange(m: string) {
    this.currentMonth = parseInt(m);
    this.createMonth(this.currentMonth, this.currentYear);
  }

  public onYearDropdownChange(y: string) {
    this.currentYear = parseInt(y);
    this.createMonth(this.currentMonth, this.currentYear);
  }

  public incrementHour(event: any) {
    let newHour = this.currentHour + this.stepHour;
    if (this.hourFormat == '24') {
      this.currentHour = (newHour >= 24) ? (newHour - 24) : newHour;
    } else if (this.hourFormat == '12') {
      this.currentHour = (newHour >= 13) ? (newHour - 12) : newHour;
    }
    this.updateTime();

    event.preventDefault();
  }

  public decrementHour(event: any) {
    let newHour = this.currentHour - this.stepHour;
    if (this.hourFormat == '24') {
      this.currentHour = (newHour < 0) ? (24 + newHour) : newHour;
    } else if (this.hourFormat == '12') {
      this.currentHour = (newHour <= 0) ? (12 + newHour) : newHour;
    }
    this.updateTime();

    event.preventDefault();
  }

  public incrementMinute(event: any) {
    let newMinute = this.currentMinute + this.stepMinute;
    this.currentMinute = (newMinute > 59) ? newMinute - 60 : newMinute;

    this.updateTime();

    event.preventDefault();
  }

  public decrementMinute(event: any) {
    let newMinute = this.currentMinute - this.stepMinute;
    this.currentMinute = (newMinute < 0) ? 60 + newMinute : newMinute;

    this.updateTime();

    event.preventDefault();
  }

  public incrementSecond(event: any) {
    let newSecond = this.currentSecond + this.stepSecond;
    this.currentSecond = (newSecond > 59) ? newSecond - 60 : newSecond;

    this.updateTime();

    event.preventDefault();
  }

  public decrementSecond(event: any) {
    let newSecond = this.currentSecond - this.stepSecond;
    this.currentSecond = (newSecond < 0) ? 60 + newSecond : newSecond;

    this.updateTime();

    event.preventDefault();
  }

  public updateTime() {
    this.value = this.value || new Date();
    if (this.hourFormat === '12' && this.pm && this.currentHour != 12) {
      this.value.setHours(this.currentHour + 12);
    } else {
      this.value.setHours(this.currentHour);
    }
    this.value.setMinutes(this.currentMinute);
    this.value.setSeconds(this.currentSecond);
    this.updateModel();
    this.onSelect.emit(this.value);
    this.updateInputfield();
  }

  public toggleAMPM(event: any) {
    this.pm = !this.pm;
    this.updateTime();
    event.preventDefault();
  }

  public onInput(event: any) {
    let val = event.target.value;
    try {
      this.value = this.parseValueFromString(val);
      this.updateUI();
      this._isValid = true;
    } catch (err) {
      // invalid date
      this.value = null;
      this._isValid = false;
    }

    this.updateModel();
    this.filled = val != null && val.length;
  }

  public parseValueFromString(text: string): Date {
    let dateValue;
    let parts: string[] = text.split(' ');

    if (this.timeOnly) {
      dateValue = new Date();
      this.populateTime(dateValue, parts[0], parts[1]);
    } else {
      if (this.showTime) {
        dateValue = this.parseDate(parts[0], this.dateFormat);
        this.populateTime(dateValue, parts[1], parts[2]);
      } else {
        dateValue = this.parseDate(text, this.dateFormat);
      }
    }

    return dateValue;
  }

  public populateTime(value: any, timeString: any, ampm: any) {
    if (this.hourFormat == '12' && !ampm) {
      throw 'Invalid Time';
    }

    this.pm = (ampm === 'PM' || ampm === 'pm');
    let time = this.parseTime(timeString);
    value.setHours(time.hour);
    value.setMinutes(time.minute);
    value.setSeconds(time.second);
  }

  public updateUI() {
    let val = this.value || this.defaultDate || new Date();
    this.createMonth(val.getMonth(), val.getFullYear());

    if (this.showTime || this.timeOnly) {
      let hours = val.getHours();

      if (this.hourFormat == '12') {
        if (hours >= 12) {
          this.currentHour = (hours == 12) ? 12 : hours - 12;
        } else {
          this.currentHour = (hours == 0) ? 12 : hours;
        }
      } else {
        this.currentHour = val.getHours();
      }

      this.currentMinute = val.getMinutes();
      this.currentSecond = val.getSeconds();
    }
  }

  public onDatePickerClick(event: any) {
    this.closeOverlay = this.dateClick;
  }

  public showOverlay(inputfield: any) {
    if (this.appendTo) {
      this.domHandler.absolutePosition(this.overlay, inputfield);
    } else {
      this.domHandler.relativePosition(this.overlay, inputfield);
    }
    this.overlayVisible = true;
    this.overlay.style.zIndex = String(++DomHandler.zindex);

    this.bindDocumentClickListener();
  }

  public writeValue(value: any): void {
    this.value = value;
    if (this.value && typeof this.value === 'string') {
      this.value = this.parseValueFromString(this.value);
    }

    this.updateInputfield();
    this.updateUI();
  }

  public registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  public setDisabledState(val: boolean): void {
    this.disabled = val;
  }

  // Ported from jquery-ui datepicker formatDate
  public formatDate(date: any, format: any) {
    if (!date) {
      return '';
    }

    let iFormat: any,
        lookAhead =
            (match: any) => {
              let matches =
                  (iFormat + 1 < format.length &&
                   format.charAt(iFormat + 1) === match);
              if (matches) {
                iFormat++;
              }
              return matches;
            },
        formatNumber =
            (match: any, value: any, len: any) => {
              let num = '' + value;
              if (lookAhead(match)) {
                while (num.length < len) {
                  num = '0' + num;
                }
              }
              return num;
            },
        formatName =
            (match: any, value: any, shortNames: any, longNames: any) => {
              return (lookAhead(match) ? longNames[value] : shortNames[value]);
            },
        output = '', literal = false;

    if (date) {
      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
            literal = false;
          } else {
            output += format.charAt(iFormat);
          }
        } else {
          switch (format.charAt(iFormat)) {
            case 'd':
              output += formatNumber('d', date.getDate(), 2);
              break;
            case 'D':
              output += formatName(
                  'D', date.getDay(), this.locale.dayNamesShort,
                  this.locale.dayNames);
              break;
            case 'o':
              output += formatNumber(
                  'o',
                  Math.round(
                      (new Date(
                           date.getFullYear(), date.getMonth(), date.getDate())
                           .getTime() -
                       new Date(date.getFullYear(), 0, 0).getTime()) /
                      86400000),
                  3);
              break;
            case 'm':
              output += formatNumber('m', date.getMonth() + 1, 2);
              break;
            case 'M':
              output += formatName(
                  'M', date.getMonth(), this.locale.monthNamesShort,
                  this.locale.monthNames);
              break;
            case 'y':
              output +=
                  (lookAhead('y') ? date.getFullYear() :
                                    (date.getFullYear() % 100 < 10 ? '0' : '') +
                           date.getFullYear() % 100);
              break;
            case '@':
              output += date.getTime();
              break;
            case '!':
              output += date.getTime() * 10000 + this.ticksTo1970;
              break;
            case '\'':
              if (lookAhead('\'')) {
                output += '\'';
              } else {
                literal = true;
              }
              break;
            default:
              output += format.charAt(iFormat);
          }
        }
      }
    }
    return output;
  }

  public formatTime(date: any) {
    if (!date) {
      return '';
    }

    let output = '';
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (this.hourFormat == '12' && this.pm && hours != 12) {
      hours -= 12;
    }

    output += (hours < 10) ? '0' + hours : hours;
    output += ':';
    output += (minutes < 10) ? '0' + minutes : minutes;

    if (this.showSeconds) {
      output += ':';
      output += (seconds < 10) ? '0' + seconds : seconds;
    }

    if (this.hourFormat == '12') {
      output += this.pm ? ' PM' : ' AM';
    }

    return output;
  }

  public parseTime(value: any) {
    let tokens: string[] = value.split(':');
    let validTokenLength = this.showSeconds ? 3 : 2;

    if (tokens.length !== validTokenLength) {
      throw 'Invalid time';
    }

    let h = parseInt(tokens[0]);
    let m = parseInt(tokens[1]);
    let s = this.showSeconds ? parseInt(tokens[2]) : null;

    if (isNaN(h) || isNaN(m) || h > 23 || m > 59 ||
        (this.hourFormat == '12' && h > 12) ||
        (this.showSeconds && (isNaN(s) || s > 59))) {
      throw 'Invalid time';
    } else {
      if (this.hourFormat == '12' && h !== 12 && this.pm) {
        h += 12;
      }

      return {hour: h, minute: m, second: s};
    }
  }

  // Ported from jquery-ui datepicker parseDate
  public parseDate(value: any, format: any) {
    if (format == null || value == null) {
      throw 'Invalid arguments';
    }

    value = (typeof value === 'object' ? value.toString() : value + '');
    if (value === '') {
      return null;
    }

    let iFormat: any, dim, extra,
        iValue = 0,
        shortYearCutoff =
            (typeof this.shortYearCutoff !== 'string' ?
                 this.shortYearCutoff :
                 new Date().getFullYear() % 100 +
                     parseInt(this.shortYearCutoff, 10)),
        year = -1, month = -1, day = -1, doy = -1, literal = false, date,
        lookAhead = (match: any) => {
          let matches =
              (iFormat + 1 < format.length &&
               format.charAt(iFormat + 1) === match);
          if (matches) {
            iFormat++;
          }
          return matches;
        }, getNumber = (match: any) => {
          let isDoubled = lookAhead(match),
              size =
                  (match === '@' ?
                       14 :
                       (match === '!' ? 20 :
                                        (match === 'y' && isDoubled ?
                                             4 :
                                             (match === 'o' ? 3 : 2)))),
              minSize = (match === 'y' ? size : 1),
              digits = new RegExp('^\\d{' + minSize + ',' + size + '}'),
              num = value.substring(iValue).match(digits);
          if (!num) {
            throw 'Missing number at position ' + iValue;
          }
          iValue += num[0].length;
          return parseInt(num[0], 10);
        }, getName = (match: any, shortNames: any, longNames: any) => {
          let index = -1;
          let arr = lookAhead(match) ? longNames : shortNames;
          let names = [];

          for (let i = 0; i < arr.length; i++) {
            names.push([i, arr[i]]);
          }
          names.sort((a, b) => {
            return -(a[1].length - b[1].length);
          });

          for (let i = 0; i < names.length; i++) {
            let name = names[i][1];
            if (value.substr(iValue, name.length).toLowerCase() ===
                name.toLowerCase()) {
              index = names[i][0];
              iValue += name.length;
              break;
            }
          }

          if (index !== -1) {
            return index + 1;
          } else {
            throw 'Unknown name at position ' + iValue;
          }
        }, checkLiteral = () => {
          if (value.charAt(iValue) !== format.charAt(iFormat)) {
            throw 'Unexpected literal at position ' + iValue;
          }
          iValue++;
        };

    for (iFormat = 0; iFormat < format.length; iFormat++) {
      if (literal) {
        if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
          literal = false;
        } else {
          checkLiteral();
        }
      } else {
        switch (format.charAt(iFormat)) {
          case 'd':
            day = getNumber('d');
            break;
          case 'D':
            getName('D', this.locale.dayNamesShort, this.locale.dayNames);
            break;
          case 'o':
            doy = getNumber('o');
            break;
          case 'm':
            month = getNumber('m');
            break;
          case 'M':
            month = getName(
                'M', this.locale.monthNamesShort, this.locale.monthNames);
            break;
          case 'y':
            year = getNumber('y');
            break;
          case '@':
            date = new Date(getNumber('@'));
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            break;
          case '!':
            date = new Date((getNumber('!') - this.ticksTo1970) / 10000);
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            break;
          case '\'':
            if (lookAhead('\'')) {
              checkLiteral();
            } else {
              literal = true;
            }
            break;
          default:
            checkLiteral();
        }
      }
    }

    if (iValue < value.length) {
      extra = value.substr(iValue);
      if (!/^\s+/.test(extra)) {
        throw 'Extra/unparsed characters found in date: ' + extra;
      }
    }

    if (year === -1) {
      year = new Date().getFullYear();
    } else if (year < 100) {
      year += new Date().getFullYear() - new Date().getFullYear() % 100 +
          (year <= shortYearCutoff ? 0 : -100);
    }

    if (doy > -1) {
      month = 1;
      day = doy;
      do {
        dim = this.getDaysCountInMonth(year, month - 1);
        if (day <= dim) {
          break;
        }
        month++;
        day -= dim;
      } while (true);
    }

    date = this.daylightSavingAdjust(new Date(year, month - 1, day));
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month ||
        date.getDate() !== day) {
      throw 'Invalid date';  // E.g. 31/02/00
    }
    return date;
  }

  public daylightSavingAdjust(date: any) {
    if (!date) {
      return null;
    }
    date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
    return date;
  }

  public updateFilledState() {
    this.filled = this.inputFieldValue && this.inputFieldValue != '';
  }

  public bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener =
          this.renderer.listenGlobal('body', 'click', () => {
            if (this.closeOverlay) {
              this.overlayVisible = false;
            }

            this.closeOverlay = true;
            this.dateClick = false;
          });
    }
  }

  public unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
  }

  ngOnDestroy() {
    this.unbindDocumentClickListener();

    if (!this.inline && this.appendTo) {
      this.el.nativeElement.appendChild(this.overlay);
    }
  }

  public validate(c: AbstractControl) {
    if (!this._isValid) {
      return {invalidDate: true};
    }

    return null;
  }
}
