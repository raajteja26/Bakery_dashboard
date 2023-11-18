from django.contrib import admin
from django.urls import include, path
from .views import OrderListCreateView
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'orders', OrderListCreateView, 'orders')

urlpatterns = [
    path("", include(router.urls)),
]
