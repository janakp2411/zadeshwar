import { Component, OnInit } from '@angular/core';
import { getGroupedGridData, createShowCellRenderer, createCellRenderer, createCountryCellRenderer, getDropDownList } from '../utils/directory';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import _ from 'lodash';

const fullData = [
    {"country": "USA","email":"a1653d4d","state":"VW","year":1998,"familyPersonName":"White","age":10000},
    {"country": "USA","email":"ddeb9b10","state":"Mercedes","year":1985,"familyPersonName":"Green","age":25000},
    {"country": "USA","email":"d8ebe413","state":"Jaguar","year":1979,"familyPersonName":"Silver","age":30000},
    {"country": "INDIA","email":"aab227b7","state":"CA","year":1970,"familyPersonName":"Black","age":12000},
    {"country": "USA","email":"aab227b1","state":"CA","year":1974,"familyPersonName":"Black","age":16000},
    {"country": "USA","email":"aa4227b1","state":"CA","year":1974,"familyPersonName":"Black","age":15000},
    {"country": "USA","email":"631f7412","state":"Volvo","year":1992,"familyPersonName":"Red","age":15500},
    {"country": "INDIA","email":"7d2d22b0","state":"Soni Faliya","year":1993,"familyPersonName":"","age":40000},
    {"country": "INDIA","email":"50e900ca","state":"Fiat","year":1964,"familyPersonName":"Blue","age":25000},
    {"country": "INDIA","email":"4bbcd603","state":"Renault","year":1983,"familyPersonName":"Maroon","age":22000},
    {"country": "INDIA","email":"70214c7e","state":"Renault","year":1961,"familyPersonName":"Black","age":19000},
    {"country": "USA","email":"ec229a92","state":"CA","year":1984,"familyPersonName":"Brown","age":36000},
    {"country": "USA","email":"1083ee40","state":"VW","year":1984,"familyPersonName":"Silver","age":215000},
    {"country": "USA","email":"6e0da3ab","state":"Volvo","year":1987,"familyPersonName":"Silver","age":32000},
    {"country": "INDIA","email":"5aee636b","state":"Jaguar","year":1995,"familyPersonName":"Maroon","age":20000},
    {"country": "INDIA","email":"7cc43997","state":"Jaguar","year":1984,"familyPersonName":"Orange","age":14000},
    {"country": "USA","email":"88ec9f66","state":"Honda","year":1989,"familyPersonName":"Maroon","age":36000},
    {"country": "USA","email":"f5a4a5f5","state":"BMW","year":1986,"familyPersonName":"Blue","age":28000},
    {"country": "INDIA","email":"15b9a5c9","state":"Mercedes","year":1986,"familyPersonName":"Orange","age":14000},
    {"country": "USA","email":"f7e18d01","state":"Mercedes","year":1991,"familyPersonName":"White","age":25000},
    {"country": "USA","email":"cec593d7","state":"VW","year":1992,"familyPersonName":"Blue","age":36000},
    {"country": "CANADA","email":"d5bac4f0","state":"Renault","year":2001,"familyPersonName":"Blue","age":25000},
    {"country": "CANADA","email":"56b527c8","state":"Jaguar","year":1990,"familyPersonName":"Yellow","age":52000},
    {"country": "CANADA","email":"1ac011ff","state":"CA","year":1966,"familyPersonName":"Maroon","age":45000},
    {"country": "CANADA","email":"fc074185","state":"BMW","year":1962,"familyPersonName":"Blue","age":54000},
    {"country": "USA","email":"606ba663","state":"Honda","year":1982,"familyPersonName":"Blue","age":22000},
    {"country": "USA","email":"d05060b8","state":"Mercedes","year":2003,"familyPersonName":"Silver","age":15000},
    {"country": "USA","email":"46e4bbe8","state":"Mercedes","year":1986,"familyPersonName":"White","age":18000},
    {"country": "USA","email":"c29da0d7","state":"BMW","year":1983,"familyPersonName":"Brown","age":32000},
    {"country": "USA","email":"24622f70","state":"VW","year":1973,"familyPersonName":"Maroon","age":36000},
    {"country": "USA","email":"7f573d2c","state":"Mercedes","year":1991,"familyPersonName":"Red","age":21000},
    {"country": "USA","email":"b69e6f5c","state":"Jaguar","year":1993,"familyPersonName":"Yellow","age":16000},
    {"country": "USA","email":"ead9bf1d","state":"Fiat","year":1968,"familyPersonName":"Maroon","age":43000},
    {"country": "USA","email":"bc58113e","state":"Renault","year":1981,"familyPersonName":"Silver","age":36000},
    {"country": "USA","email":"2989d5b1","state":"Honda","year":2006,"familyPersonName":"Blue","age":240000},
    {"country": "USA","email":"c243e3a0","state":"Fiat","year":1990,"familyPersonName":"Maroon","age":15000},
    {"country": "USA","email":"e3d3ebf3","state":"CA","year":1996,"familyPersonName":"White","age":28000},
    {"country": "USA","email":"45337e7a","state":"Mercedes","year":1982,"familyPersonName":"Blue","age":14000},
    {"country": "USA","email":"36e9cf7e","state":"Fiat","year":2000,"familyPersonName":"Orange","age":26000},
    {"country": "USA","email":"036bf135","state":"Mercedes","year":1973,"familyPersonName":"Black","age":22000},
    {"country": "USA","email":"ad612e9f","state":"Mercedes","year":1975,"familyPersonName":"Red","age":45000},
    {"country": "USA","email":"97c6e1e9","state":"Volvo","year":1967,"familyPersonName":"Green","age":42000},
    {"country": "USA","email":"ae962274","state":"Volvo","year":1982,"familyPersonName":"Red","age":36000},
    {"country": "USA","email":"81f8972a","state":"BMW","year":2007,"familyPersonName":"Black","age":56000},
    {"country": "USA","email":"f8506743","state":"CA","year":1975,"familyPersonName":"Blue","age":42300},
    {"country": "USA","email":"f85063743","state":"CA","year":1075,"familyPersonName":"Blue","age":42900},
    {"country": "USA","email":"f85064743","state":"CA","year":1958,"familyPersonName":"Blue","age":45000},
    {"country": "USA","email":"f85065743","state":"CA","year":1975,"familyPersonName":"Blue","age":42000},
    {"country": "USA","email":"596859d1","state":"Fiat","year":2002,"familyPersonName":"Green","age":48000},
    {"country": "USA","email":"d83c1d9a","state":"Volvo","year":1972,"familyPersonName":"Black","age":29000},
    {"country": "USA","email":"32f41550","state":"Mercedes","year":1978,"familyPersonName":"Brown","age":17000},
    {"country": "USA","email":"c28cd2e4","state":"Volvo","year":1982,"familyPersonName":"Silver","age":24000},
    {"country": "USA","email":"80890dcc","state":"CA","year":1962,"familyPersonName":"White","age":36000},
    {"country": "USA","email":"4bf1aeb5","state":"VW","year":2000,"familyPersonName":"Silver","age":24000},
    {"country": "USA","email":"45ca4786","state":"BMW","year":1995,"familyPersonName":"Maroon","age":50000}
  ];

const columns = [
    {
        headerName: "Select",
        field: "select",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
        suppressMovable: true,
        width: 60,
        filter: false
    },
    {
        headerName: 'Country',
        field: 'country',
        type: 'countryField',
        width: 110,
        suppressSizeToFit: true,
        suppressMovable: true
    },
    {
        headerName: 'State',
        field: 'state',
        type: 'stateField',
        width: 150,
        suppressSizeToFit: true,
        suppressMovable: true
    },
    {
        headerName: 'Family Person Name',
        field: 'familyPersonName',
        type: 'familyPersonNameField',
        suppressSizeToFit: true,
        suppressMovable: true,
        width: 250
    },
    {
        headerName: 'Age',
        field: 'age'
    },
    {
        headerName: 'Email',
        field: 'email'
    }
];

const userConfigs = [
    {
        headerName: 'Janak',
        field: 'Patel',
        value: 'Hello',
        componentType: 'dropdown'
    },
    {
        headerName: 'chetan',
        field: 'Patelk',
        value: 'Hello Chetan',
        componentType: 'text'
    }
]


@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})

export class DirectoryComponent implements OnInit {

    public filterTerm: string;
    onGlobalFilterChange = new Subject<string>();
    private gridApi;
    private gridColumnApi;
    private columnDefs;
    private rowData = [];
    private components;
    private defaultColDef;
    floatingFilter;
    private gridViews;
    private selectedView = { code: 'countryAndstateAndfamily'}
    private columnTypes: any;
    disableGloabalFilter;
    country: any;
    disabledEdit: boolean;
    disabledDelete: boolean;
    rowSelection: string;
    suppressRowClickSelection: boolean;
    states: any[];
    rowHeight;
    headerHeight;
    selectedCountry: any;
    selectedCities1: [];
    selectedCities2: [];
    streets: any[];
    selectedStates: [];
    openDialog: boolean;
    modalData: any[];
    openAddUserDialog: boolean;
    userConfigs: any[];
    constructor() {
        this.selectedStates = [];
        this.disableGloabalFilter = false;
        this.gridViews = [
            {label:'Group By - State/Family', value:{id:1, name: 'Rome', code: 'countryAndstateAndfamily'}},
            {label:'No Grouping', value:{id:2, name: 'NO Grouping', code: 'none'}},
        ];
        this.streets = [
            {label:'Soni Faliya', value:{id:1, name: 'Soni Faliya', code: 'sonifaliya'}},
            {label:'Patel Park', value:{id:1, name: 'Patel Park', code: 'patelparkfaliya'}},,
            {label:'Amin Faliya', value:{id:1, name: 'Amin Faliya', code: 'animfaliya'}},
        ];
        this.userConfigs = userConfigs;
        this.openAddUserDialog = false;
        this.disabledEdit = true;
        this.disabledDelete = true;
        this.suppressRowClickSelection = true;
        this.rowData= [];
        this.openDialog = false;
        this.rowHeight = 48;
        this.headerHeight = 48;
        this.floatingFilter = false;
        this.rowSelection = 'multiple';
        this.columnTypes = {
            countryField: {
                rowSpan: function(params) {
                    if(params.data.country){
                        return params.data.numberOfSameCountry;
                    }
                },
                cellClassRules: { "show-cell": function(params){
                    return params.data.numberOfSameCountry;
                    }
                },
                // cellStyle: function(params) {
                //     if(params.data.country){
                //         const height = params.data.numberOfSameCountry * 48;
                //         return {'height': height + 'px'};
                //     }
                // },
            },
            stateField: {
                rowSpan: function(params) {
                    if(params.data.state){
                        return params.data.numberOfChildren;
                    }
                },
                cellClassRules: { "show-cell": function(params){
                    return params.data.numberOfChildren;
                    }
                }
            },
            familyPersonNameField: {
                rowSpan: function(params) {
                    if(params.data.familyPersonName){
                        return params.data.hasSubChildren;
                    }
                  },
                  cellClassRules: { "show-cell": function(params){
                    return params.data.hasSubChildren;
                  } 
                },
            }
        },
        this.columnDefs = this.getColumns(columns);
        this.components = { 
          showCellRenderer: createShowCellRenderer(), 
          showRenderer: createCellRenderer(),
          showCountryCellRenderer: createCountryCellRenderer()
        };
        this.defaultColDef = {
            minWidth: 100,
            resizable: true,
            rowHeight: 48,
            headerHeight: 48,
            animateRows: true,
            suppressMenuHide: false,
            rowSelection: 'multiple'
        };
        this.onGlobalFilterChange.pipe(
            debounceTime(500),
            distinctUntilChanged())
            .subscribe(value => {
              this.filterTerm = value;
             this.applyGlobalFilterOnGrid();
        });
    }

    onHideDialog(isOpen){
        this.openAddUserDialog = false;

    }

    onAddRecord(){
        this.openAddUserDialog = true;
        console.log('on add');
    }

    onEditRecord(){
        this.modalData = this.columnDefs.map((column, index) => ({...column, value: column.value, index}));
        const selectedRow = this.gridApi.getSelectedRows();
        this.openDialog = true;
        console.log(selectedRow)
    }

    onDeleteRecords(){
        const selectedRow = this.gridApi.getSelectedRows();
        console.log(selectedRow)
    }

    ngOnInit() {
        this.country = getDropDownList(fullData, 'country');
        this.selectedCountry = this.country.find(c => c.value.code === 'USA').value;
        this.states = getDropDownList(this.applyDropDownFilterOnGrid(true), 'state');
        this.applyDropDownFilterOnGrid(); 
    }

    onSelectionChanged(){    
        const selectedRow = this.gridApi.getSelectedRows();
        if(!selectedRow.length){
            this.disabledEdit = true;
            this.disabledDelete = true;
        } else {
            if(selectedRow.length === 1){
                this.disabledEdit = false;
            } else {
                this.disabledEdit = true;
            }
            this.disabledDelete = false;
        }
        console.log(selectedRow)

    }
    applyDropDownFilterOnGrid(returnData = false){
        const filteredData = [];
        if(!this.selectedCountry){
            return;
        }
        fullData.forEach(data => {
            if(this.selectedCountry.name.toUpperCase() === data.country.toUpperCase()){
                if(this.selectedStates.length){
                    if(this.selectedStates.find((state: any) => state.name.toUpperCase() === data.state.toUpperCase())){
                        filteredData.push(data);
                    }
                } else {
                    filteredData.push(data);
                }
            }
        });
    
        if(!returnData){
            this.rowData = this.selectedView.code !== 'none' ? getGroupedGridData(filteredData) : filteredData;
        } else {
            return filteredData;
        }
    }

    getColumns(columns){
        if(this.selectedView.code === 'countryAndstateAndfamily'){
            return columns.map(a => ({...a, filter: false, sortable: false}))
        } else {
            const newColumns = columns.map(a => ({...a}));
            newColumns.forEach(column => {
                column.filter = 'text';
                column.sortable = true;
                delete column.type;
            });
            console.log(newColumns);
            return newColumns;
        }
    }

    applyGlobalFilterOnGrid(){
        const filteredData = this.applyDropDownFilterOnGrid(true);
        if(!this.filterTerm){
            this.rowData = getGroupedGridData(filteredData);
        }
        this.rowData = getGroupedGridData(filteredData.filter(data => {
            let isExist = false;
            const keys = Object.keys(data);
            for(let i=0; i<keys.length; i++){
                const key = keys[i];
                if(data[key] && String(data[key]).toLocaleLowerCase().includes(this.filterTerm.toLocaleLowerCase())){
                    isExist = true;
                    break;
                }
            }
            return isExist;
        }));
    }

    onSelectionChange(event, filterType){
        if(filterType === 'country'){
            this.selectedCountry = event.value;
        } else if(filterType === 'state'){
            this.selectedStates = event.value
        } else if(filterType === 'viewType'){
            this.selectedView = event.value;
            const isNoneGroup = this.selectedView.code === 'none';
            this.rowData =  isNoneGroup ? fullData : getGroupedGridData(fullData);
            this.columnDefs = this.getColumns(columns);
            this.floatingFilter = isNoneGroup;
            this.disableGloabalFilter = isNoneGroup;
            this.filterTerm = '';
            this.applyDropDownFilterOnGrid();
        }
    }

    onCloseDropDown(event, type){
        this.filterTerm = '';
        if(type === 'country'){
            this.selectedStates = [];
            const data = this.applyDropDownFilterOnGrid(true);
            this.states = getDropDownList(data, 'state');
            this.rowData = this.selectedView.code !== 'none' ? getGroupedGridData(data) : data;
        } else if(type === 'state'){
            this.applyDropDownFilterOnGrid();
        }
    }

    onDisplayedColumnsChanged(){
        this.gridApi && this.gridApi.sizeColumnsToFit();
    }

    onGridSizeChanged(){
        this.gridApi && this.gridApi.sizeColumnsToFit();
    }

    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.gridApi.sizeColumnsToFit();
    }

    onBtExport() {
        this.gridApi.exportDataAsCsv();
    }
  }

  function processData(input) {
    //Enter your code here
    var ans;
    function isDup(index){
        var reuslt = false;
        for(let j=0; j<input.length; j++){
            if(input[j] === input[index] && index !== j){
                return true;;
            }
        }
        return reuslt;
    }
    
   for(let i=0; i<input.length; i++){
       if(isDup(i) === false){
          return input[i];
       }
    }
    return ans;
} 

console.log(processData([1, 2, 3, 4, 5, 99, 1, 2, 3, 4, 5]));