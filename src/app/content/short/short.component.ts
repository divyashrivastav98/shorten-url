import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContentService } from '../content.service';
import { ResponseModel } from '../responseData.model';

@Component({
  selector: 'app-short',
  templateUrl: './short.component.html',
  styleUrls: ['./short.component.css']
})
export class ShortComponent implements OnInit {

  constructor(private contentService : ContentService,private clipBoard : Clipboard) { }

  ngOnInit(): void {
    this.contentService.count.subscribe((resp)=>{
      this.data = JSON.parse(localStorage.getItem("url_data") || '[]');
    })
    this.data = JSON.parse(localStorage.getItem("url_data") || '[]');
  }

  @ViewChild('f') formElement !: NgForm;
  url : string = '';
  shortenUrl : string = '';
  data : ResponseModel[] = [];
  index !: number;
  @ViewChild('urlIn') urlIn !: string;

  onSubmit(){
    this.urlIn = '';
    if(this.formElement.value.urlInput == '' || this.formElement.value.urlInput == null){
      this.urlIn = 'Please add a link';
      return
    }
    this.url = this.formElement.value.urlInput;
    this.contentService.onShortenUrl(this.url);
    this.data = JSON.parse(localStorage.getItem("url_data") || '[]');
  }

  onCopy(url:string,index:number){
    this.index = index;
    let btn;
    this.data.forEach((item,ind)=>{
      
      if(ind==index){
        btn=document.getElementById(index.toString());
        if(btn?.innerHTML){
          btn.innerHTML = 'Copied!';
        }
      }else{
        btn=document.getElementById(ind.toString());
        if(btn?.innerHTML){
          btn.innerHTML = 'Copy';
        }
      }
      
    })
    this.clipBoard.copy(`https://${url}`);
  }

}
