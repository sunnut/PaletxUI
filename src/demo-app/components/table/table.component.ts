import {Component} from '@angular/core';
import {InnerOperationComponent} from './operation.component';
import {SmInnerOperationComponent} from './small-operation.component';

@Component(
    {moduleId: module.id, selector: 'table-demo', templateUrl: 'table.html'})

export class PxTableDemoComponent {
  innerOperation: any = InnerOperationComponent;
  smInnerOpration: any = SmInnerOperationComponent;

  // baseSettings = {
  //  hideHeader: true,
  //  hideSubHeader: true,
  //  columns: {
  //    col1: {title: '表头文字'},
  //    col2: {title: '表头文字'},
  //    col3: {title: '数字(G)'},
  //    col4: {title: '百分比(%)'},
  //    col5: {title: '状态'},
  //    col6: {
  //      title: '操作',
  //      type:'component',
  //      component:this.innerOperation,
  //      paras:'common',
  //      filter:false,
  //      sort:false,
  //      class:'operation'}
  //  },
  //  pager: {display: true, perPage: 5, pageStep: 5},
  //  showDetailControl: true,
  //  localData: this.data,
  //  source: 'local',
  //  prepareDataOnLocal: true,
  //  language: 'zh',
  //  showGlobalFilter: true,
  //  showCheckBox: true,
  //  showRowIndex: true,
  //  noDataMessage: '没有符合条件的数据'
  //};

  data = [
    {
      col1: 'xxxxxxxx',
      col2: 'xxxxxxxx',
      col3: 64,
      col4: '64%',
      col5: 'xxxxxxxx'
    },
    {col1: 'xxxx', col2: 'xxxx', col3: 126, col4: '12%', col5: 'xxxx'},
    {col1: 'xxxxxx', col2: 'xxxxxx', col3: 8, col4: '8%', col5: 'xxxxxx'}
  ];

  styleSettings1 = {
    type: 'light',
    hideHeader: false,
    hideSubHeader: true,
    columns: {
      col1: {title: '表头文字'},
      col2: {title: '表头文字'},
      col3: {title: '数字(G)', class: 'number'},
      col4: {title: '百分比(%)', class: 'number'},
      col5: {title: '状态'},
      col6: {
        title: '操作',
        type: 'component',
        component: this.innerOperation,
        filter: false,
        sort: false,
        class: 'operation'
      }
    },
    attr: {
      id: '',
      class: '',
    },
    pager: {display: true, perPage: 5, pageStep: 5},
    showDetailControl: false,
    localData: [
      {
        col1: 'xxxxxxxx',
        col2: 'xxxxxxxx',
        col3: '64',
        col4: '65%',
        col5: 'xxxxxxxx'
      },
      {col1: 'xxxx', col2: 'xxxx', col3: '126', col4: '12%', col5: 'xxxx'},
      {col1: 'xxxxxx', col2: 'xxxxxx', col3: '8', col4: '8%', col5: 'xxxxxx'}
    ],
    source: 'local',
    prepareDataOnLocal: true,
    language: 'zh',
    showGlobalFilter: false,
    showCheckBox: true,
    showRowIndex: true,
    noDataMessage: '没有符合条件的数据'
  };

  styleSettings2 = {
    hideHeader: false,
    hideSubHeader: true,
    columns: {
      col1: {title: '表头文字'},
      col2: {title: '表头文字表头文字表头文字'},
      col3: {title: '表头文字'},
      col4: {title: '表头文字'},
      col5: {title: '表头文字'},
      col6: {title: '数字(G)', class: 'number'},
      col7: {title: '百分比(%)', class: 'number'},
      col8: {title: '状态'},
      col9: {
        title: '操作',
        type: 'component',
        component: this.smInnerOpration,
        filter: false,
        sort: false,
        class: 'operation'
      }
    },
    attr: {
      id: '',
      class: '',
    },
    pager: {display: false},
    showDetailControl: false,
    localData: [
      {
        col1: 'xxxxxxxx',
        col2: 'xxxxxxxx',
        col3: 'xxxxxxxx',
        col4: 'xxxxxxxx',
        col5: 'xxxxxxxx',
        col6: '64',
        col7: '65%',
        col8: 'xxxxxxxx'
      },
      {
        col1: 'xxxx',
        col2: 'xxxx',
        col3: 'xxxx',
        col4: 'xxxx',
        col5: 'xxxx',
        col6: '126',
        col7: '12%',
        col8: 'xxxx'
      },
      {
        col1: 'xxxxxx',
        col2: 'xxxxxx',
        col3: 'xxxxxx',
        col4: 'xxxxxx',
        col5: 'xxxxxx',
        col6: '8',
        col7: '8%',
        col8: 'xxxxxx'
      }
    ],
    source: 'local',
    prepareDataOnLocal: true,
    language: 'zh',
    showGlobalFilter: false,
    showCheckBox: true,
    showRowIndex: true,
    noDataMessage: '没有符合条件的数据'
  };

  styleSettings3 = {
    type: 'light',
    hideHeader: false,
    hideSubHeader: true,
    columns: {
      col1: {title: '表头文字'},
      col2: {title: '表头文字'},
      col3: {title: '表头文字'}
    },
    attr: {
      id: '',
      class: 'multi-line',
    },
    pager: {display: false},
    showDetailControl: false,
    localData: [
      {
        col1: 'xxxxxxxx',
        col2: 'xxxxxxxx',
        col3:
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' +
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      },
      {
        col1: 'xxxxxx',
        col2: 'xxxxxx',
        col3:
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' +
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      }
    ],
    source: 'local',
    prepareDataOnLocal: true,
    language: 'zh',
    showGlobalFilter: false,
    showCheckBox: false,
    showRowIndex: false,
    noDataMessage: '没有符合条件的数据'
  };

  actionDemo1 = {
    hideHeader: false,
    hideSubHeader: true,
    columns: {
      col1: {title: '表头文字', type: 'html'},
      col2: {title: '表头文字表头文字'},
      col3: {title: '表头文字'},
      col4: {title: '表头文字'},
      col5: {title: '表头文字'},
      col6: {title: '数字(G)', class: 'number'},
      col7: {title: '百分比(%)', class: 'number'},
      col8: {title: '状态'},
      col9: {
        title: '操作',
        type: 'component',
        component: this.smInnerOpration,
        filter: false,
        sort: false,
        class: 'operation'
      }
    },
    attr: {
      id: '',
      class: '',
    },
    pager: {display: false},
    showDetailControl: false,
    localData: [
      {
        col1: '<a>xxxxxxxx</a>',
        col2: 'xxxxxxxx',
        col3: 'xxxxxxxx',
        col4: 'xxxxxxxx',
        col5: 'xxxxxxxx',
        col6: '64',
        col7: '65%',
        col8: 'xxxxxxxx'
      },
      {
        col1: '<a>xxxx</a>',
        col2: 'xxxx',
        col3: 'xxxx',
        col4: 'xxxx',
        col5: 'xxxx',
        col6: '126',
        col7: '12%',
        col8: 'xxxx'
      },
      {
        col1: '<a>xxxxxx</a>',
        col2: 'xxxxxx',
        col3: 'xxxxxx',
        col4: 'xxxxxx',
        col5: 'xxxxxx',
        col6: '8',
        col7: '8%',
        col8: 'xxxxxx'
      }
    ],
    source: 'local',
    prepareDataOnLocal: true,
    language: 'zh',
    showGlobalFilter: false,
    showCheckBox: true,
    showRowIndex: true,
    noDataMessage: '没有符合条件的数据'
  };

  actionDemo3 = {
    hideHeader: false,
    hideSubHeader: true,
    columns: {
      col1: {title: '表头文字', sort: true, sortDirection: 'asc'},
      col2: {title: '表头文字表头文字'},
      col3: {title: '表头文字'},
      col4: {title: '表头文字'},
      col5: {title: '表头文字'},
      col6: {title: '数字(G)', sort: true, class: 'number'},
      col7: {title: '百分比(%)', class: 'number'},
      col8: {title: '状态'},
      col9: {
        title: '操作',
        type: 'component',
        component: this.smInnerOpration,
        filter: false,
        sort: false,
        class: 'operation'
      }
    },
    attr: {
      id: '',
      class: '',
    },
    pager: {display: false},
    showDetailControl: false,
    localData: [
      {
        col1: 'xxxxxxxx',
        col2: 'xxxxxxxx',
        col3: 'xxxxxxxx',
        col4: 'xxxxxxxx',
        col5: 'xxxxxxxx',
        col6: '64',
        col7: '65%',
        col8: 'xxxxxxxx'
      },
      {
        col1: 'xxxx',
        col2: 'xxxx',
        col3: 'xxxx',
        col4: 'xxxx',
        col5: 'xxxx',
        col6: '126',
        col7: '12%',
        col8: 'xxxx'
      },
      {
        col1: 'xxxxxx',
        col2: 'xxxxxx',
        col3: 'xxxxxx',
        col4: 'xxxxxx',
        col5: 'xxxxxx',
        col6: '8',
        col7: '8%',
        col8: 'xxxxxx'
      }
    ],
    source: 'local',
    prepareDataOnLocal: true,
    language: 'zh',
    showGlobalFilter: false,
    showCheckBox: true,
    showRowIndex: true,
    noDataMessage: '没有符合条件的数据'
  };

  actionDemo4 = {
    hideHeader: false,
    hideSubHeader: true,
    columns: {
      col1: {title: '表头文字', filter: true},
      col2: {title: '表头文字', filter: true},
      col3: {title: '表头文字', filter: true},
      col4: {title: '数字(G)', filter: true, class: 'number'},
      col5: {title: '百分比(%)', filter: true, class: 'number'},
      col6: {title: '状态'},
      col7: {
        title: '操作',
        type: 'component',
        component: this.smInnerOpration,
        filter: false,
        sort: false,
        class: 'operation'
      }
    },
    attr: {
      id: '',
      class: '',
    },
    pager: {display: false},
    showDetailControl: false,
    localData: [
      {
        col1: 'xxxxxxxx',
        col2: 'xxxxxxxx',
        col3: 'xxxxxxxx',
        col4: '64',
        col5: '65%',
        col6: 'xxxxxxxx'
      },
      {
        col1: 'xxxx',
        col2: 'xxxx',
        col3: 'xxxx',
        col4: '126',
        col5: '12%',
        col6: 'xxxx'
      },
      {
        col1: 'xxxxxx',
        col2: 'xxxxxx',
        col3: 'xxxxxx',
        col4: '8',
        col5: '8%',
        col6: 'xxxxxx'
      }
    ],
    source: 'local',
    prepareDataOnLocal: true,
    language: 'zh',
    showGlobalFilter: true,
    showColumnFilterToggle: true,
    showCheckBox: true,
    showRowIndex: false,
    noDataMessage: '没有符合条件的数据'
  };

  actionDemo7 = {
    hideHeader: false,
    hideSubHeader: true,
    columns: {
      col1: {title: '表头文字'},
      col2: {title: '表头文字'},
      col3: {title: '表头文字'},
      col4: {title: '数字(G)', class: 'number'},
      col5: {title: '百分比(%)', class: 'number'},
      col6: {title: '状态'},
      col7: {
        title: '操作',
        type: 'component',
        component: this.smInnerOpration,
        filter: false,
        sort: false,
        class: 'operation'
      }
    },
    attr: {
      id: 'table-detail',
      class: '',
    },
    pager: {display: false},
    localData: [
      {
        col1: 'xxxxxxxx',
        col2: 'xxxxxxxx',
        col3: 'xxxxxxxx',
        col4: '64',
        col5: '65%',
        col6: 'xxxxxxxx',
        id: '1',
        detail: 'xxxxxxxx',
      },
      {
        col1: 'xxxx',
        col2: 'xxxx',
        col3: 'xxxx',
        col4: '126',
        col5: '12%',
        col6: 'xxxx',
        id: '2',
        detail: 'xxxx'
      },
      {
        col1: 'xxxxxx',
        col2: 'xxxxxx',
        col3: 'xxxxxx',
        col4: '8',
        col5: '8%',
        col6: 'xxxxxx',
        id: '3',
        detail: 'xxxxxx'
      }
    ],
    source: 'local',
    prepareDataOnLocal: true,
    language: 'zh',
    showDetailControl: true,
    showGlobalFilter: false,
    showCheckBox: false,
    showRowIndex: true,
    noDataMessage: '没有符合条件的数据'
  };

  noHeaderDemo = {
    hideHeader: true,
    hideSubHeader: true,
    columns: {
      col1: {title: '表头文字'},
      col2: {title: '表头文字'},
      col3: {
        title: '操作',
        type: 'component',
        component: this.smInnerOpration,
        class: 'operation'
      }
    },
    attr: {
      id: '',
      class: '',
    },
    pager: {display: false},
    showDetailControl: false,
    localData: [
      {col1: 'xxxxxxxx', col2: 'xxxxxxxx'}, {col1: 'xxxx', col2: 'xxxx'}, {
        col1: 'xxxxxx',
        col2: 'xxxxxx',
      }
    ],
    source: 'local',
    prepareDataOnLocal: true,
    language: 'zh',
    showGlobalFilter: false,
    showCheckBox: false,
    showRowIndex: false,
    noDataMessage: '没有符合条件的数据'
  };
}