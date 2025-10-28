from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import menu, orders

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Quetta Arsalan Cafe POS System")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(menu.router)
app.include_router(orders.router)


@app.get("/")
def root():
    return {"message": "Quetta Arsalan Cafe POS API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
