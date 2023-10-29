from core.models import UUIDModel
from django.db import models
from products import choices


class Color(models.Model):
    name = models.CharField(max_length=30)
    code = models.CharField(max_length=10, choices=choices.COLOR)

    def __str__(self):
        return self.name


class Size(models.Model):
    title = models.CharField(max_length=10, choices=choices.SIZE)

    def __str__(self):
        return self.title


class Product(UUIDModel):
    name = models.CharField(max_length=40)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=0)

    def __str__(self):
        return self.name


class ProductEntry(UUIDModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    color = models.ForeignKey(Color, on_delete=models.CASCADE, null=True, blank=True)
    size = models.ForeignKey(Size, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return str(self.product)


class Image(UUIDModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="products/")

    def __str__(self):
        return str(self.product)
