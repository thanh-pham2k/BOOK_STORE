from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *

class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        depth = 1


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

User =  get_user_model()
class Userserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','first_name','last_name','email')
        extra_kwargs = {"password":{"write_only":True,"required":True}}

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
        reed_only_fields = ['prouser']
    def validate(self,attrs):
        attrs['prouser'] = self.context['request'].user
        return attrs
    def to_representation(self,instance):
        response = super().to_representation(instance)
        response['prouser'] = Userserializer(instance.prouser).data
        return response


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"

class CartProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartProduct
        fields = "__all__"
        depth = 1

class OrderSerializer (serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"