import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ContentService } from '../content/content.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isExpanded : boolean = false;

  constructor(private contentService : ContentService) { }

  ngOnInit(): void {
  }
  // @ViewChild('toggle') toggle !: ElementRef;
  
  onToggle(){
    this.isExpanded = !this.isExpanded;
    this.contentService.onToggle(this.isExpanded);
  }


}
