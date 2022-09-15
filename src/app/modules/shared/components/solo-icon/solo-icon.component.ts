import { Component } from '@angular/core';
import { IconAbstract } from 'src/app/models/classes/icon.abstract';
import { sources } from 'src/app/models/data';

@Component({
  selector: 'app-solo-icon',
  templateUrl: './solo-icon.component.html',
  styleUrls: ['./solo-icon.component.scss']
})
export class SoloIconComponent extends IconAbstract {
  sources = sources;
}
