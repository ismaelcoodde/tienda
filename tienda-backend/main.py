from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session
import traceback

import models
import auth
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(traceback.format_exc())
    return JSONResponse(status_code=500, content={"detail": str(exc)})

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

class UserSchema(BaseModel):
    email: str
    password: str

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

@app.post("/register")
def register(user: UserSchema, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="El email ya está registrado")
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"mensaje": "Usuario creado correctamente"}

@app.post("/login")
def login(user: UserSchema, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Email o contraseña incorrectos")
    if not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Email o contraseña incorrectos")
    token = auth.create_access_token(data={"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer"}