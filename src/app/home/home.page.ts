import {Component} from '@angular/core';
import {TranslationService} from '../services/translation.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    public textIn: string;
    public textOut: string;
    public languages: { lang: string, short: string }[];
    public from = 'en';
    public to = 'de';

    public recording = false;
    private mediaRecorder: any;

    constructor(private translationService: TranslationService) {
        this.translationService.getLanguages().subscribe(res => {
            this.languages = res;
            this.switchLanguages();
        });
    }

    public translate(): void {
        this.translationService.getTranslation(this.textIn, this.from, this.to).subscribe(res => this.textOut = res);
    }

    public switchLanguages() {
        const newFrom = this.to;
        this.to = this.from;
        this.from = newFrom;
        const newOut = this.textIn;
        this.textIn = this.textOut;
        this.textOut = newOut;
    }

    public textToSpeechFrom() {
        this.translationService.textToSpeech(this.textIn);
    }

    public textToSpeechTo() {
        this.translationService.textToSpeech(this.textOut);
    }

    public async recordButtonClick() {
        if (this.recording) {
            this.recording = false;
            this.mediaRecorder.stop();
            delete this.mediaRecorder;
            return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // @ts-ignore
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();

        this.mediaRecorder.addEventListener('dataavailable', event => {
            console.log(event);
        });
        this.recording = true;
    }
}
