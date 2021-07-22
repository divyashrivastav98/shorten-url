import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { ResponseModel } from './responseData.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http : HttpClient) { }

  dataArray :ResponseModel[] = [];
  count = new Subject<number>()
  
  isExpanded = new Subject<boolean>();

  onShortenUrl(url:string){
    return this.http.get<{ok:boolean,result:ResponseModel}>(`https://api.shrtco.de/v2/shorten?url=${url}`)
    .pipe(map((response)=>{
      if(response.ok){
        this.dataArray = JSON.parse(localStorage.getItem("url_data") || '[]');
        this.dataArray.push(response.result);
        localStorage.setItem("url_data",JSON.stringify(this.dataArray));
        this.count.next(1);
      }
    }))
    .subscribe((response)=>{

    })
  }

  onToggle(val:boolean){
    this.isExpanded.next(val);
  }
}
