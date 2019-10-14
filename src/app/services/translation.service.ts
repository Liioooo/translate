import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {

    private url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20191008T090358Z.45ed3146bf77ed4c.94615bd5d0e0af7036b92d8c78eeb90abfbb3522';

    constructor(private http: HttpClient) {
    }

    public getTranslation(text: string, from: string, to: string): Observable<string> {
        const formData = new FormData();
        formData.append('text', text);
        return this.http.get(`${this.url}&text=${text}&lang=${from}-${to}`).pipe(
            map(r => {
                // @ts-ignore
                return r.text[0];
            })
        );
    }

    public getLanguages(): Observable<{ lang: string, short: string }[]> {
        return this.http.get('https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=trnsl.1.1.20191008T090358Z.45ed3146bf77ed4c.94615bd5d0e0af7036b92d8c78eeb90abfbb3522').pipe(
            map((r: any) => {
                const object: { lang: string, short: string }[] = [];
              // tslint:disable-next-line:forin
                for (const key in r.langs) {
                    object.push({lang: r.langs[key], short: key});
                }
                console.log(object);
                return object;
            })
        );
    }
}
