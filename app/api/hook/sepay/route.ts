import { NextResponse, NextRequest } from 'next/server';
import { SePayWebhookPayload } from '@/types/sepay';

const SEPAY_API_KEY = process.env.SEPAY_API;

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const expectedAuth = `Apikey ${SEPAY_API_KEY}`; 

    if (authHeader !== expectedAuth) {
      console.warn("Webhook: Sai API Key!", { got: authHeader });
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: SePayWebhookPayload = await request.json();

    if (!(body.transferType === 'in' && body.transferAmount > 0)) {
        return NextResponse.json({ error: 'error type' }, { status: 400 });
    }
    

    return NextResponse.json({ 
      success: true, 
      message: 'Webhook received successfully' 
    }, { status: 200 });

  } catch (error) {
    console.error("Lỗi xử lý webhook:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}