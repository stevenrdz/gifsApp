import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse, Images } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private key: string = '';
  private _historial: string[] =[];
  public resultados: Gif[] = [];
  private searchUrl: string = 'https://api.giphy.com/v1/gifs'

  get historial(){
    return [...this._historial];
  }


  constructor (private https: HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados =  JSON.parse(localStorage.getItem('gifs')!) || []
    /* if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    } */

  }

// forma asyncrona
  // async buscarGifs(query: string = ''){
  buscarGifs(query: string = ''){
    
    query = query.trim().toLocaleLowerCase(); 

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }
    
    localStorage.setItem('historial',JSON.stringify(this._historial))

    const params = new HttpParams()
      .set('api_key',this.key)
      .set('limit', '10')
      .set('q', query)

    //* *//
    this.https.get<SearchGifsResponse>(`${this.searchUrl}/search`, {params})
    .subscribe( (resp : any) => {
      // console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('gifs',JSON.stringify(this.resultados));
    })
    // console.log(this.resultados);
  }

}
// *
// javascript
    /* fetch('https://api.giphy.com/v1/gifs/search?api_key=''=dragon ball&limit=10')
      .then(resp => {
        resp.json().then(data =>{
          console.log(data);
        })
      }) */

    // Async await
    /* const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=''=dragon ball&limit=10');
    const data = await resp.json();
    console.log(data); */
//*
