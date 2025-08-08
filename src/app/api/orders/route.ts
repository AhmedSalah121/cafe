import { NextRequest, NextResponse } from 'next/server';
import { OrderService } from '@/services/orderService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const customerId = searchParams.get('customerId');

    const orderService = new OrderService();
    let orders;

    if (status) {
      orders = await orderService.getOrdersByStatus(status);
    } else if (customerId) {
      orders = await orderService.getOrdersByCustomer(customerId);
    } else {
      orders = await orderService.getAllOrders();
    }

    await orderService.disconnect();

    return NextResponse.json({
      success: true,
      data: orders
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.customerId || !body.total) {
      return NextResponse.json(
        { success: false, message: 'Customer ID and total are required' },
        { status: 400 }
      );
    }

    const orderService = new OrderService();
    const order = await orderService.createOrder(body);
    await orderService.disconnect();

    return NextResponse.json({
      success: true,
      data: order
    }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 400 }
    );
  }
} 