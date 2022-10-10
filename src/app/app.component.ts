import {Component, OnInit} from '@angular/core';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {


  public timeAuckland: string = '';
  public timeBerlin: string = '';
  public timeSanFran: string = '';

  ngOnInit() {

    setInterval(() => {
      this.timeAuckland = DateTime.now().setZone('Pacific/Auckland').toFormat('HH:mm:ss (EEEE)')
      this.timeBerlin = DateTime.now().setZone('Europe/Berlin').toFormat('HH:mm:ss (EEEE)')
      this.timeSanFran = DateTime.now().setZone('America/Los_Angeles').toFormat('HH:mm:ss (EEEE)')
    }, 1000)
  }

}

if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker(new URL('./app.worker.ts', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}



