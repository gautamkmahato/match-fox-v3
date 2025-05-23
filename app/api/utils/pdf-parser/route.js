// app/api/extract-pdf/route.js

import fs from 'fs/promises'; // Use fs.promises for async operations
import pdfParse from 'pdf-parse';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const pdfFile = formData.get('pdfFile'); // 'pdfFile' is the name of the input field in the client

    console.log('--- API Route Start ---');
    console.log('Received request.');

    if (!pdfFile || !(pdfFile instanceof File)) {
      console.error('Error: No PDF file uploaded or invalid file type.');
      return NextResponse.json({ error: 'No PDF file uploaded or invalid file type.' }, { status: 400 });
    }

    if (pdfFile.type !== 'application/pdf') {
      console.error(`Error: Only PDF files are allowed. Received type: ${pdfFile.type}`);
      return NextResponse.json({ error: 'Only PDF files are allowed.' }, { status: 400 });
    }

    console.log(`File received: ${pdfFile.name}, size: ${pdfFile.size} bytes, type: ${pdfFile.type}`);

    // Convert the File object to a Buffer
    const arrayBuffer = await pdfFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`Buffer created from file. Buffer length: ${buffer.length}`);

    // Parse the PDF data
    console.log('Attempting to parse PDF with pdf-parse...');
    const data = await pdfParse(buffer);
    console.log('PDF parsed successfully.');

    // Return the extracted text
    console.log('Returning extracted text.');
    return NextResponse.json({ text: data.text }, { status: 200 });

  } catch (error) {
    console.error('--- API Route Error ---');
    console.error('Error processing PDF:', error);
    // Log the specific error details if available
    if (error.code) {
      console.error(`Error Code: ${error.code}`);
    }
    if (error.syscall) {
      console.error(`Error Syscall: ${error.syscall}`);
    }
    if (error.path) {
      console.error(`Error Path: ${error.path}`);
    }
    return NextResponse.json({ error: 'Failed to extract text from PDF. Please check server logs for details.' }, { status: 500 });
  } finally {
    console.log('--- API Route End ---');
  }
}
