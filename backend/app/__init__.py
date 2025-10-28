from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import menu, orders

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Quetta Arsalan Cafe POS System")

# Configure CORS - Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
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
