from django.db import models
from django.contrib.auth.models import User
# Create your models here.
"""
Quy tắc viết class -> viết HOA chữ cái đầu (class Thanh)
"""

class Profile(models.Model):
    prouser = models.OneToOneField(User,on_delete=models.CASCADE)
    image = models.ImageField(upload_to="profile/",blank=True,null=True)
    def __str__(self):
        return self.prouser.username
    
class Category(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField(auto_now_add = True)
    def __str__(self):
        return self.title

class Product(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField(auto_now_add= True)
    category = models.ForeignKey(Category,on_delete = models.SET_NULL,blank=True,null=True)
    image = models.ImageField(upload_to="products/")
    market_price = models.PositiveIntegerField()
    selling_price = models.PositiveIntegerField()
    description = models.TextField()
    def __str__(self):
        return self.title


class Cart(models.Model):
    customer = models.ForeignKey(Profile,on_delete=models.Case)
    total = models.PositiveIntegerField()
    complit = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)
    def __str__(self):
        return f"cart==id{self.id}==Complit=={self.complit}"


class CartProduct(models.Model):
    cart = models.ForeignKey(Cart,on_delete = models.CASCADE)
    product = models.ManyToManyField(Product)
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField(default=0)
    subtotal = models.PositiveIntegerField()
    def __str__(self):
        return f"Cart=={self.cart.id}==CartProduct=={self.id}==Quantity=={self.quantity}"

ORDER_STATUS = (
    ("Order Received", "Order Received"),
    ("Order Processing", "Order Processing"),
    ("On the way", "On the way"),
    ("Order Completed", "Order Completed"),
    ("Order Canceled", "Order Canceled"),
)


class Order(models.Model):
    cart = models.OneToOneField(Cart,on_delete= models.CASCADE)
    address = models.CharField(max_length=250)
    mobile = models.CharField(max_length= 16)
    email = models.CharField(max_length=100)
    total = models.PositiveIntegerField()
    discount = models.PositiveIntegerField()
    order_status = models.CharField(max_length=22,choices=ORDER_STATUS,default = "Order Reserved")
    date = models.DateField(auto_now_add=True)
    payment = models.BooleanField(default=True)


