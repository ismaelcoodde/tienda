from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

import models
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ProductSchema(BaseModel):
    title: str
    price: float
    image: str
    description: str

@app.get("/")
def home():
    return {"mensaje": "Hola desde FastAPI"}

@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()

@app.get("/products/{id}")
def get_product(id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == id).first()
    if product is None:
        return {"error": "Producto no encontrado"}
    return product

@app.post("/products")
def create_product(product: ProductSchema, db: Session = Depends(get_db)):
    new_product = models.Product(**product.model_dump())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@app.put("/products/{id}")
def update_product(id: int, product: ProductSchema, db: Session = Depends(get_db)):
    existing = db.query(models.Product).filter(models.Product.id == id).first()
    if existing is None:
        return {"error": "Producto no encontrado"}
    for key, value in product.model_dump().items():
        setattr(existing, key, value)
    db.commit()
    db.refresh(existing)
    return existing

@app.delete("/products/{id}")
def delete_product(id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == id).first()
    if product is None:
        return {"error": "Producto no encontrado"}
    db.delete(product)
    db.commit()
    return {"mensaje": "Producto eliminado"}