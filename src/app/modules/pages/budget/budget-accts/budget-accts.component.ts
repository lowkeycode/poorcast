import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/modules/shared/services/modal.service';

@Component({
  selector: 'app-budget-accts',
  templateUrl: './budget-accts.component.html',
  styleUrls: ['./budget-accts.component.scss']
})
export class BudgetAcctsComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  onAddAccount() {
    this.modalService.openModal({
      title: 'Add Account'
    })
  }

}
