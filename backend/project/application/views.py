from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Order
from .serializers import OrderSerializer

class OrderListCreateView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True
        return super(OrderListCreateView, self).get_serializer(*args, **kwargs)

    def get_queryset(self):
        return Order.objects.all()
