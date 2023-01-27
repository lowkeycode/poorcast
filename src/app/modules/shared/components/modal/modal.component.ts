import { ModalService } from './../../services/modal.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export interface BudgetModalConfig {
  title: string;
  icon?: ModalIcon;
  fieldsets: Fieldset[];
  modalButtons: ButtonConfig[];
}

export interface ModalIcon {
  iconName: string;
  iconSize: number;
}

export interface Fieldset {
  name: string;
  inputs: FieldsetInput[]
  index?: number;
}

export interface FieldsetInput {
  formControlName: string;
  label: string;
  type: string;
  hidden: boolean;
  valid?: boolean;
  invalid?: boolean;
  feedBackMsg?: string;
  showFeedback?: boolean;
}

export interface ButtonConfig {
  buttonText: string;
  type: string;
  dataTest: string;
  clickFn: () => any
}


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  modal$: Observable<BudgetModalConfig | null>;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modal$ = this.modalService.modalState$;
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
