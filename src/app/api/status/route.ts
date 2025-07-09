import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/payment/status?orderId=xxx
 * Check payment status for a specific order
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // TODO: Check order status in your database
    // const orderStatus = await getOrderStatus(orderId);
    
    // Mock response for now
    const mockStatus = {
      orderId,
      status: 'pending', // pending, paid, failed, cancelled
      amount: null,
      transactionId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      order: mockStatus
    });

  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}