import { NextRequest, NextResponse } from 'next/server';
import { CustomerService } from '@/services/customerService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const withOrders = searchParams.get('withOrders') === 'true';

    const customerService = new CustomerService();
    let customers;

    if (withOrders) {
      customers = await customerService.getCustomersWithOrders();
    } else {
      customers = await customerService.getAllCustomers();
    }

    await customerService.disconnect();

    return NextResponse.json({
      success: true,
      data: customers
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
    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400 }
      );
    }

    const customerService = new CustomerService();
    const customer = await customerService.createCustomer(body);
    await customerService.disconnect();

    return NextResponse.json({
      success: true,
      data: customer
    }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 400 }
    );
  }
} 