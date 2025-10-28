from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from .. import models, schemas
from ..database import get_db
import traceback

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.post("/", response_model=schemas.Order, status_code=status.HTTP_201_CREATED)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    """Create a new order"""
    try:
        print(f"Received order request: {order}")
        
        # Generate order number
        order_number = f"ORD-{datetime.now().strftime('%Y%m%d%H%M%S')}"
        print(f"Generated order number: {order_number}")
        
        # Calculate total and create order items
        total_amount = 0
        order_items = []
        
        for item in order.items:
            print(f"Processing item: menu_item_id={item.menu_item_id}, quantity={item.quantity}")
            menu_item = db.query(models.MenuItem).filter(
                models.MenuItem.id == item.menu_item_id
            ).first()
            
            if not menu_item:
                raise HTTPException(
                    status_code=404,
                    detail=f"Menu item {item.menu_item_id} not found"
                )
            
            if not menu_item.is_available:
                raise HTTPException(
                    status_code=400,
                    detail=f"Menu item {menu_item.name_ur} is not available"
                )
            
            item_total = menu_item.price * item.quantity
            total_amount += item_total
            
            order_items.append({
                "menu_item_id": item.menu_item_id,
                "quantity": item.quantity,
                "price": menu_item.price,
                "item_name_ur": menu_item.name_ur
            })
        
        print(f"Total amount: {total_amount}")
        
        # Create order
        db_order = models.Order(
            order_number=order_number,
            total_amount=total_amount,
            status="pending"
        )
        db.add(db_order)
        db.commit()
        db.refresh(db_order)
        
        print(f"Order created with ID: {db_order.id}")
        
        # Create order items
        for item_data in order_items:
            db_order_item = models.OrderItem(
                order_id=db_order.id,
                **item_data
            )
            db.add(db_order_item)
        
        db.commit()
        print(f"Order completed successfully: {db_order.order_number}")
        return db_order
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"ERROR creating order: {str(e)}")
        print(traceback.format_exc())
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create order: {str(e)}"
        )


@router.get("/", response_model=List[schemas.Order])
def get_orders(
    skip: int = 0,
    limit: int = 100,
    status_filter: str = None,
    db: Session = Depends(get_db)
):
    """Get all orders with optional status filter"""
    query = db.query(models.Order)
    
    if status_filter:
        query = query.filter(models.Order.status == status_filter)
    
    orders = query.order_by(models.Order.created_at.desc()).offset(skip).limit(limit).all()
    return orders


@router.get("/{order_id}", response_model=schemas.OrderWithItems)
def get_order(order_id: int, db: Session = Depends(get_db)):
    """Get a specific order with its items"""
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Get order items
    order_items = db.query(models.OrderItem).filter(
        models.OrderItem.order_id == order_id
    ).all()
    
    return {
        **order.__dict__,
        "items": order_items
    }


@router.patch("/{order_id}/status")
def update_order_status(
    order_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    """Update order status"""
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if status not in ["pending", "completed", "cancelled"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    order.status = status
    db.commit()
    db.refresh(order)
    return order
