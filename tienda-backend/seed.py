from database import SessionLocal, engine
import models

models.Base.metadata.create_all(bind=engine)

db = SessionLocal()

productos = [
    {
        "title": "Pantalón vaquero",
        "price": 49.99,
        "image": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
        "description": "Vaquero slim fit, cómodo y resistente."
    },
    {
        "title": "Zapatillas blancas",
        "price": 69.99,
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
        "description": "Zapatillas deportivas ligeras, suela de goma."
    },
    {
        "title": "Sudadera con capucha",
        "price": 39.99,
        "image": "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=300&h=300&fit=crop",
        "description": "Sudadera unisex, interior afelpado muy suave."
    },
    {
        "title": "Gorra negra",
        "price": 24.99,
        "image": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=300&fit=crop",
        "description": "Gorra de algodón con visera plana, estilo urbano."
    }
]

for p in productos:
    db.add(models.Product(**p))

db.commit()
db.close()

print("Productos añadidos correctamente")