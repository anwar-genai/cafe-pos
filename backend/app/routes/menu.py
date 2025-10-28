from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/api/menu", tags=["menu"])


@router.get("/", response_model=List[schemas.MenuItem])
def get_menu_items(
    skip: int = 0,
    limit: int = 100,
    category: str = None,
    db: Session = Depends(get_db)
):
    """Get all menu items with optional filtering"""
    query = db.query(models.MenuItem)
    
    if category:
        query = query.filter(models.MenuItem.category == category)
    
    items = query.offset(skip).limit(limit).all()
    return items


@router.get("/{item_id}", response_model=schemas.MenuItem)
def get_menu_item(item_id: int, db: Session = Depends(get_db)):
    """Get a specific menu item by ID"""
    item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return item


@router.post("/", response_model=schemas.MenuItem, status_code=status.HTTP_201_CREATED)
def create_menu_item(item: schemas.MenuItemCreate, db: Session = Depends(get_db)):
    """Create a new menu item"""
    db_item = models.MenuItem(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.put("/{item_id}", response_model=schemas.MenuItem)
def update_menu_item(
    item_id: int,
    item_update: schemas.MenuItemUpdate,
    db: Session = Depends(get_db)
):
    """Update an existing menu item"""
    db_item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    
    if not db_item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    # Update only provided fields
    update_data = item_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_item, field, value)
    
    db.commit()
    db.refresh(db_item)
    return db_item


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_menu_item(item_id: int, db: Session = Depends(get_db)):
    """Delete a menu item"""
    db_item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    
    if not db_item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    db.delete(db_item)
    db.commit()
    return None


@router.get("/categories/list", response_model=List[str])
def get_categories(db: Session = Depends(get_db)):
    """Get list of all unique categories"""
    categories = db.query(models.MenuItem.category).distinct().all()
    return [cat[0] for cat in categories if cat[0]]


