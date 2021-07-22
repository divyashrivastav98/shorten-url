import { Component, OnInit } from '@angular/core';
import { ContentService } from './content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private contentService:ContentService) { }
  
  isExpanded : boolean = false;
  marginTop !: string;

  ngOnInit(): void {
    this.contentService.isExpanded.subscribe((response)=>{
      this.isExpanded = response;
    })
  }

  getMarginTop(){
   this.marginTop = '-' + ((JSON.parse(localStorage.getItem("url_data") || '[]').length * 6) + 5) +'%';
   return this.marginTop;
  }

}
