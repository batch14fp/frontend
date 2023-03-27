import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordLimit'
})
export class WordLimitPipe implements PipeTransform {
  transform(content: string, limit: number): string {
    const words = content.split(' ');
    if (words.length > limit) {
      content = words.slice(0, limit).join(' ') + '...';
    }
    return content;
  }
}
