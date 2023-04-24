class SpeechApi {

  protected _isAvailable = false;
  protected recognition: SpeechRecognition;
  protected isRecording = false;

  get isAvailable() {
    return this._isAvailable;
  }

  constructor() {
    if (window['webkitSpeechRecognition'] === undefined) return;
    const SpeechRecognitionClass = window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognitionClass();
    this.recognition.continuous = false;
    this.recognition.lang = 'en-US';
    this.recognition.maxAlternatives = 1;
  }

  async init() {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      this._isAvailable = true;
    } catch (e) {
      console.error(e);
    }
  }

  async startRecord(): Promise<string> {
    this.isRecording = true;
    return new Promise((resolve, reject) => {
      this.recognition.onerror = (err) => {
        console.error(err)
        this.isRecording = false;
        return reject(err);
      }
      let speechStart = false;
      this.recognition.onspeechstart = () => {
        speechStart = true;
      }
      this.recognition.onaudioend = () => {
        if (!speechStart) resolve(null);
      }
      this.recognition.onnomatch = (e) => {
        resolve(null);
      };

      this.recognition.onresult = (event) => {
        let text = [];
        for (let i = event.resultIndex; i < event.results.length; i++) {
          text.push(event.results[i][0].transcript);
          if (event.results[i].isFinal) {
            this.recognition.stop();
            this.isRecording = false;
            resolve(text.join(' '));
          }
        }
      };

      this.recognition.start();

    })
  }

  stopRecord() {
    if (!this.isRecording) return;
    this.recognition.stop();
    console.log('STOP!!!');
  }
}

export const speechApi = new SpeechApi();
