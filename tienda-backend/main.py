from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

products = [
    {
        "id": 1,
        "title": "Camiseta básica",
        "price": 19.99,
        "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
        "description": "Camiseta de algodón 100%, disponible en varios colores."
    },
    {
        "id": 2,
        "title": "Pantalón vaquero",
        "price": 49.99,
        "image": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
        "description": "Vaquero slim fit, cómodo y resistente."
    },
    {
        "id": 3,
        "title": "Zapatillas blancas",
        "price": 69.99,
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
        "description": "Zapatillas deportivas ligeras, suela de goma."
    },
    {
        "id": 4,
        "title": "Sudadera con capucha",
        "price": 39.99,
        "image": "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=300&h=300&fit=crop",
        "description": "Sudadera unisex, interior afelpado muy suave."
    },
    {
        "id": 5,
        "title": "Gorra negra",
        "price": 24.99,
        "image": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=300&fit=crop",
        "description": "Gorra de algodón con visera plana, estilo urbano."
    }
]

@app.get("/")
def home():
    return {"mensaje": "Hola desde FastAPI"}

@app.get("/products")
def get_products():
    return products

@app.get("/products/{id}")
def get_product(id: int):
    product = next((p for p in products if p["id"] == id), None)
    if product is None:
        return {"error": "Producto no encontrado"}
    return product