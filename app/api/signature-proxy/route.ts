import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('Signature proxy request received');
    
    // Extract the URL and data from the request body
    const { url, data } = await request.json();
    console.log('Request URL:', url);
    console.log('Request data:', JSON.stringify(data));

    if (!url) {
      console.error('Missing URL parameter');
      return NextResponse.json(
        { error: 'Missing URL parameter' },
        { status: 400 }
      );
    }

    // Forward the request to the external service
    console.log('Forwarding request to external service...');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('External service response status:', response.status);
    
    // Check if the response is successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`External service error: ${response.status}`, errorText);
      return NextResponse.json(
        { error: `External service returned ${response.status}: ${errorText}` },
        { status: response.status }
      );
    }

    try {
      // Parse the response
      const responseData = await response.json();
      console.log('Response data:', JSON.stringify(responseData));
      
      // Check if the response has a "signed-message" field
      if (responseData["signed-message"]) {
        console.log('Found signed-message in response');
        // Return just the signed-message
        return NextResponse.json({
          "signed-message": responseData["signed-message"]
        });
      } 
      
      // Check for other common field names
      if (responseData.signedMessage) {
        console.log('Found signedMessage in response');
        return NextResponse.json({
          "signed-message": responseData.signedMessage
        });
      }
      
      // If we can't find any specific signature field, return the entire response
      // but with a note that we couldn't find a specific signed message field
      console.log('No specific signed message field found, returning original response');
      return NextResponse.json({
        "originalResponse": responseData,
        "note": "No specific signed message field found in the external service response"
      });
      
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      
      // If JSON parsing fails, get the raw text and return it
      const rawText = await response.text();
      console.log('Raw response text:', rawText);
      
      return NextResponse.json({
        error: "Failed to parse JSON response from external service",
        rawResponse: rawText,
        parseError: parseError instanceof Error ? parseError.message : 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Signature proxy error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 