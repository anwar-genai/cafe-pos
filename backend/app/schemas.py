from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class MenuItemBase(BaseModel):
    name_ur: str
    name_en: Optional[str] = None
    price: float
    category: Optional[str] = None
    is_available: bool = True


class MenuItemCreate(MenuItemBase):
    pass


class MenuItemUpdate(BaseModel):
    name_ur: Optional[str] = None
    name_en: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    is_available: Optional[bool] = None


class MenuItem(MenuItemBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class OrderItemBase(BaseModel):
    menu_item_id: int
    quantity: int


class OrderCreate(BaseModel):
    items: list[OrderItemBase]


class OrderItem(BaseModel):
    id: int
    order_id: int
    menu_item_id: int
    quantity: int
    price: float
    item_name_ur: str

    class Config:
        from_attributes = True


class Order(BaseModel):
    id: int
    order_number: str
    total_amount: float
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class OrderWithItems(Order):
    items: list[OrderItem] = []


