import { Component,  EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss']
})
export class DetailFormComponent implements OnInit {
  headerName: string;
  @Input() openAddUserDialog: any;
  @Input() userConfigs: any[];
  @Output() hideDialog = new EventEmitter<boolean>();
  constructor() { 
    // this.openDialog = openAddUserDialog
    this.headerName = 'Edit Information'
  }

  ngOnInit() {
    console.log(this.userConfigs)
  }

  onHide(){
    // this.openDialog = false;
    this.hideDialog.emit(false)
    // console.log(this.openDialog)
  }

}