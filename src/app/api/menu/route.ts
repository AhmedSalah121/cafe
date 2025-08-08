import { NextRequest, NextResponse } from 'next/server';
import { MenuItemService } from '@/services/menuItemService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const available = searchParams.get('available') || 'true';

    const menuItemService = new MenuItemService();
    let menuItems;

    if (category) {
      menuItems = await menuItemService.getMenuItemsByCategory(category);
    } else if (available === 'true') {
      menuItems = await menuItemService.getAvailableMenuItems();
    } else {
      menuItems = await menuItemService.getAllMenuItems();
    }

    await menuItemService.disconnect();

    return NextResponse.json({
      success: true,
      data: menuItems
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
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { success: false, message: 'Name, price, and category are required' },
        { status: 400 }
      );
    }

    const menuItemService = new MenuItemService();
    const menuItem = await menuItemService.createMenuItem(body);
    await menuItemService.disconnect();

    return NextResponse.json({
      success: true,
      data: menuItem
    }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 400 }
    );
  }
} 