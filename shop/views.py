from rest_framework import generics,mixins, viewsets,views
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
class ProductView(generics.GenericAPIView,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    queryset = Product.objects.all().order_by("-id")
    serializer_class=ProductSerializers
    lookup_field = "id"

    def get(self,request,id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)


class CategoryView(viewsets.ViewSet):
    def list(self,request):
        query = Category.objects.all().order_by("-id")
        serializers = CategorySerializer(query,many=True)
        return Response(serializers.data)

    def retrieve(self,response,pk=None):
        """
        Nhớ define ProductSerializers (chú ý là có s nhé)
        """
        query = Category.objects.get(id=pk)
        serializers = CategorySerializer(query)
        serializers_data = serializers.data
        all_data = []
        category_products = Product.objects.filter(category_id=serializers_data['id'])
        category_products_serializer = ProductSerializers(category_products,many=True)
        serializers_data['category_products'] = category_products_serializer.data
        all_data.append(serializers_data)
        return Response(all_data)



class ProfileView(views.APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]
    def get(self,request):
        try:
            query = Profile.objects.get(prouser = request.user)
            serializers = ProfileSerializer(query)
            response_msg = {"error":False,"data":serializers.data}
        except:
            response_msg = {"error":True,"message":"Something is Wrong!! Try Again"}
        return Response(response_msg)


class UserDataUpdate(views.APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]
    def post(self,request):
        try:
            user = request.user
            data = request.data
            user_obj = User.objects.get(username=user)
            user_obj.first_name = data["first_name"]
            user_obj.lastname = data["last_name"]
            user_obj.email = data["email"]
            user_obj.save()
            response_msg = {"error":False,"message":"User is updated"}
        except:
            response_msg = {"error":True,"message":"User is not Updated!!! Try again"}

        return Response(response_msg)
    


class ProfileImageUpdate(views.APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]
    
    def post(self,request):
        try:
            user = request.user
            query = Profile.objects.get(prouser=user)
            data = request.data
            serializers = ProfileSerializer(query,data=data,context={"request":request})
            serializers.is_valid(raise_exception=True)
            serializers.save()
            response_msg = {"message":"Profile is Updated!"}
        except:
            response_msg = {"message":"Something is Wrong Try Again !"}
        return Response(response_msg)


class Mycart(viewsets.ViewSet):
    authentication_classes=[TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    
    def list(self,request):
        query = Cart.objects.filter(customer=request.user.profile)
        serializers = CartSerializer(query,many=True)
        all_data=[]
        for cart in serializers.data:
            cart_product = CartProduct.objects.filter(cart=cart["id"])
            cart_product_serializer = CartProductSerializer(cart_product,many=True)
            cart["cartproduct"] = cart_product_serializer.data
            all_data.append(cart)
        return Response(all_data)


class OldOrders(viewsets.ViewSet):
    authentication_classes=[TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    def list(self,request):
        query = Order.objects.filter(cart__customer = request.user.profile)
        serializers = OrderSerializer(query,many=True)
        all_data = []
        for order in serializers.data:
            # cart_product = CartProduct.objects.filter(cart_id=order['cart']['id'])
            cart_product = CartProduct.objects.filter(cart_id=order['id'])
            cart_product_serializer = CartProductSerializer(cart_product,many=True)
            order['cartproduct'] = cart_product_serializer.data
            all_data.append(order)
        return Response(all_data)

    def retrieve(self,request,pk=None):
        query = Order.objects.get(id=pk)
        serializers = OrderSerializer(query)
        all_data =[]
        cartproduct = CartProduct.objects.filter(cart_id = serializers.data['cart']['id'])
        cartproduct_serializer = CartProductserializer(cartproduct,many=True)
        serializers["cartproduct"] = cartproduct_serializer.data
        all_data.append(serializers.data)
        return Response(all_data)
