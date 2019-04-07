import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  legends = []
  constructor() { }

  ngOnInit() {
    this.legends = [
      {
        name: 'Janak',
        imageSrc: `https://picsum.photos/900/500?random&t=${Math.random()}`,
        description: 'My Name Janak I am Honest'
      },
      {
        name: 'Janak',
        imageSrc: `https://picsum.photos/900/500?random&t=${Math.random()}`,
        description: 'My Name Janak I am Honest'
      },
      {
        name: 'Janak',
        imageSrc: `https://picsum.photos/900/500?random&t=${Math.random()}`,
        description: 'My Name Janak I am Honest'
      },
      {
        name: 'Janak',
        imageSrc: `https://picsum.photos/900/500?random&t=${Math.random()}`,
        description: 'My Name Janak I am Honest'
      },
      {
        name: 'Janak',
        imageSrc: `https://picsum.photos/900/500?random&t=${Math.random()}`,
        description: 'My Name Janak I am Honest'
      }
    ]
  }

}
