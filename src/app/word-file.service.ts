// word-file.service.ts

import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class WordFileService {

  generateWordFile(data: any): void {
    // Construct the Word document content based on the provided data
    const content = this.constructWordDocument(data);

    // Create a Blob from the content
    const blob = new Blob([content], { type: 'application/msword' });

    // Save the Blob as a file using FileSaver.js
    saveAs(blob, 'SalaryCertificate.doc');
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
      </style>
    </head>
    <body>

    <header>
      <h1><b>Salary Certificate</b></h1>
    </header>
  
    <section>
      <div>
        <p>Certificate No:/Serial No: CINEC/2023/VL001</p>
      </div><br>
      <div>
        <p>Tin of the Withholding Agent: 114120944</p>
      </div><br>
      
      <h3><b>Certificate of Withholding Tax(WHT) / Advanced Income Tax(AIT) Deduction</b></h3>
  
      <div>
        <p>Name and address of the Withholding Agent: <b>CINEC Campus (pvt) Ltd Millennium Drive, IT Park, Malabe</b></p>
      </div><br>
      <div>
        <p>Name and address of the Withholdee: Dr.Surani Tissera</p>
      </div><br>
      <div>
        <p>National Identity Card No./Passport No./Tax Identification No: 199456464659</p>
      </div><br>
      <div>
        <p>Payment Made for Period: from 01.01.2023  to   31.01.2023 </p>
      </div><br>
      <div>
        <p>Gross Amount(LKR): 200,000</p>
      </div><br>
  
      <table>
        <thead>
          <tr>
            <th>Payment Type</th>
            <th>Amount Subject to WHT</th>
            <th>Amount Not Subject to WHT</th>
            <th>WHT / AIT Rate (%)</th>
            <th>Amount of WHT / AIT Deducted</th>
            <th>Net Amount Paid (LKR)</th>
          </tr>
        </thead>
        <tbody>
          <!-- Add your payment data here -->
          <tr>
            <td>Consultancy fees</td>
            <td>200,000.00</td>
            <td></td>
            <td>5%</td>
            <td>10,000.00</td>
            <td>190,000.00</td>
          </tr>
          <tr>
              <td>Consultancy fees</td>
              <td>200,000.00</td>
              <td></td>
              <td>5%</td>
              <td>10,000.00</td>
              <td>190,000.00</td>
            </tr>
            <tr>
              <td>Consultancy fees</td>
              <td>200,000.00</td>
              <td></td>
              <td>5%</td>
              <td>10,000.00</td>
              <td>190,000.00</td>
            </tr>
            <tr>
              <td><b>Total</b></td>
              <td><b>600,000.00</b></td>
              <td><b></b></td>
              <td><b></b></td>
              <td><b>30,000.00</b></td>
              <td><b>570,000.00</b></td>
            </tr>
          <!-- Repeat the above row for each payment -->
        </tbody>
      </table>
  
      <div class="paragraph">
        <p><b>Above deducted WHT/AIT was paid commissionoer General of Inland Revenue as follows.</b></p>
      </div>
  
      <div>
        <p>Cheque/Auto Payment receipt No:  ........................................</p>
      </div><br>
      <div>
        <p>Date of Payment:  ........................................</p>
      </div>
  
    </section>
  
    <div >
      <div class="signature">
          <p>.....................................</p>
        <p>MS. Tharanga Gamage</p>
      </div>
  
      <div>
        <p class="align-right">.....................................</p>
        <p class="align-right">Date:</p>
      </div>
    </div>
  
    <div>
      <p >Name and Signature of the Authorized Officer</p>
    </div>
  
    
  
  </body>
    </html>
    
    `;
  }
}
