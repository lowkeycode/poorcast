import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { IconAbstract } from 'src/app/models/classes/icon.abstract';
import { IconMap } from 'src/app/models/types';


@Component({
  selector: 'app-icon',
  templateUrl: './side-nav-icon.component.html',
  styleUrls: ['./side-nav-icon.component.scss']
})
export class SideNavIconComponent extends IconAbstract implements AfterViewInit {
  @ViewChild('iconContainer') iconContainer: ElementRef;
  @Input() navOpen = true;

  sources: IconMap = {
    addCircle: '../../../../../assets/icons/add-circle-outline.svg',
    arrowBack: '../../../../../assets/icons/arrow-back-outline.svg',
    arrowForward: '../../../../../assets/icons/arrow-forward-outline.svg',
    calendar: '../../../../../assets/icons/calendar-outline.svg',
    cash: '../../../../../assets/icons/cash-outline.svg',
    checkCircle: '../../../../../assets/icons/checkmark-circle-outline.svg',
    closeCircle: '../../../../../assets/icons/close-circle-outline.svg',
    ellipsisHorizontal: '../../../../../assets/icons/ellipsis-horizontal-circle-outline.svg',
    signout: '../../../../../assets/icons/log-out-outline.svg',
    peopleCircle: '../../../../../assets/icons/people-circle-outline.svg',
    personAdd: '../../../../../assets/icons/person-add-outline.svg',
    personRemove: '../../../../../assets/icons/person-remove-outline.svg',
    minimize: '../../../../../assets/icons/remove-outline.svg',
    settings: '../../../../../assets/icons/settings-outline.svg',
    swap: '../../../../../assets/icons/swap-horizontal-outline.svg',
  }

  constructor() {
    super()
   }

   ngAfterViewInit(): void {
    this.iconContainer.nativeElement.style.width = `${this.remSize}rem`;
    this.iconContainer.nativeElement.style.height = `${this.remSize}rem`;
}

}
