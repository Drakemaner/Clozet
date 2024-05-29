import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ScreenshotService {

  constructor() { }

  takeScreenshot = async (screen : HTMLElement | null) => {

    console.log(screen)
    const width = screen!.offsetWidth; // Aumenta a largura em 2 vezes
    const height = screen!.offsetHeight; // Aumenta a altura em 2 vezes
    
    const canvas = await html2canvas(screen!, {width: width, height: height, foreignObjectRendering: true});
    const imageData = canvas.toDataURL('image/png');

    return imageData
  }
}
