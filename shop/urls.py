from django.urls import path,include
from .views import *
from rest_framework import routers

route = routers.DefaultRouter()
route.register("category",CategoryView,basename="CategoryView")

route.register("cart",Mycart,basename="CatagoryViewset")
route.register("orders",OldOrders,basename="orders")


urlpatterns  = [
    path("",include(route.urls)),
    path("product/",ProductView.as_view(),name="product"),
    path("product/<int:id>/",ProductView.as_view(),name="productdetail"),
    path ("profile/",ProfileView.as_view(),name="profile"),
    path("userdataupdate/",UserDataUpdate.as_view(),name="userdataupdate"),
    path("profileimageupdate/",ProfileImageUpdate.as_view(),name="profileimageupdate")
]
