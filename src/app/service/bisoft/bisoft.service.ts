import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseServer } from 'src/app/core/models/response';
import { Register } from 'src/app/core/models/register';
import { catchError, map, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BisoftService {
  uriBisoft = `${environment.apiBisoft}/`;
  constructor(private http: HttpClient) { }

  
  register(request:Register):Observable<ResponseServer> | null {
    try {
      console.log('REQUEST::', request);
      return this.http.post<ResponseServer>(`${this.uriBisoft}register`, request).pipe(
        map(response=>{
          if(response.ok){
           console.log('info guardada') 
          }
          return response;
        }),
        catchError(err => {
          console.log(err);
          return throwError(() => 'Error');
        })
      );
    } catch (error) {
      console.error('Error al loguear el Usuario', error);
      return null;
    }
  }

}
