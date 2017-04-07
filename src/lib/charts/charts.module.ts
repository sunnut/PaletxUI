import {NgModule} from '@angular/core';

import {BarCharts} from './bar-charts';
import {ChartsService} from './charts.services';
import {LineCharts} from './line-charts';

@NgModule({providers: [LineCharts, BarCharts, ChartsService]})

export class PxChartsModule {
}