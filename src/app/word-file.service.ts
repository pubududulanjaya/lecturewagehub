// word-file.service.ts

import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class WordFileService {

  generateWordFile(data: any, filename: string): void {
    // Construct the Word document content based on the provided data
    const content = this.constructWordDocument(data);

    // Create a Blob from the content
    const blob = new Blob([content], { type: 'application/msword' });

    // Save the Blob as a file using FileSaver.js
    saveAs(blob, `${filename}.doc`);
  }

  private constructWordDocument(data: any): string {
    // Implement the logic to convert data into Word document content
    // You can use HTML to define the structure of the Word document

    // Example: Assuming data is an object with properties like 'name', 'salary', etc.
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
      /* Add this CSS to your existing styles */
      body {
          background-color: #f8f9fa; /* Light grayish background color */
          border: 2px solid #333; /* Add a 2px solid border with color #333 */
          padding: 20px; /* Add padding to create space between the border and content */
          box-sizing: border-box; /* Include padding and border in the element's total width and height */
      }
      
      .container {
          background-color: #f7f9fc;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
      }
      
      table {
          background-color: #c0d5f5;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      
      /* Optional: Style the table header */
      table thead th {
          background-color: rgb(87, 62, 226);
          color: #fff;
      }
      
      /* Optional: Style the table rows on hover */
      table tbody tr:hover {
          background-color: #f5f5f5;
      }
      
      th, td {
          border: 1px solid #939394;
          padding: 8px;
          text-align: center;
      }
      /* Add this CSS to your existing styles */
      .signature {
          display: flex;
          justify-content: space-between;
      }
      
      .signature .left {
          text-align: left;
      }
      
      .signature .right {
          text-align: right;
      }
      
      .signature p {
          margin: 0; /* Remove default margin to avoid extra space around the paragraphs */
      }
      
      .download-button {
          margin-top: 20px; /* Add some space between the signature and the download button */
          background-color: #007bff;
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
      }
      
      .download-button:hover {
          background-color: #0056b3;
      }
      
      </style>
    </head>
    <body>

    <header>
      <h1><b>Salary Certificate</b></h1>
    </header>
  
    <section>
      <!-- Your content generation logic here -->
    </section>
  
    <div class="signature">
      <!-- Your signature and date logic here -->
    </div>
  
    <div>
      <p>Name and Signature of the Authorized Officer</p>
    </div>
  </body>
    </html>
    `;
  }
}
