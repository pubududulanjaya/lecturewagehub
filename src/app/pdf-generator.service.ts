// pdf-generator.service.ts
import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  generateSalaryReport(): void {
    const doc = new jsPDF();

    // Get the content from the specified div
    const content = document.querySelector('.container.mt-5.px-2') as HTMLElement;

    if (content) {
      // Use html2canvas to capture the content as an image
      html2canvas(content).then((canvas) => {
        // Convert the canvas to an image URL
        const imgData = canvas.toDataURL('image/png');

        // Add the image to the PDF
        doc.addImage(imgData, 'PNG', 10, 10, 190, 0);

        // Save the PDF
        doc.save('salary_report.pdf');
      });
    } else {
      console.error('Div not found or does not contain content.');
    }
  }
}
