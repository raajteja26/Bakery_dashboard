from django.db import models

class Order(models.Model):
    ITEM_TYPES = [('Cake', 'Cake'), ('Cookies', 'Cookies'), ('Muffins', 'Muffins')]
    ORDER_STATES = [('Created', 'Created'), ('Shipped', 'Shipped'), ('Delivered', 'Delivered'), ('Canceled', 'Canceled')]

    item_type = models.CharField(max_length=50, choices=ITEM_TYPES)
    order_state = models.CharField(max_length=50, choices=ORDER_STATES)
    last_update_time = models.DateTimeField(auto_now=True)
    branch = models.IntegerField()
    customer = models.IntegerField()

    def __str__(self):
        return str(self.customer)
