import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(seconds: number): string {
    const milliseconds = seconds * 1000;
    return new Intl.DateTimeFormat('en-CA', {
      weekday: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(milliseconds));
  }
}
