from django.db import models
from Account.models import Account



class Reservation(models.Model):
    TIME_CHOICES = (
        ('1', '8-10'),
        ('2', '10-12'),
        ('3', '12-14'),
        ('4', '14-16'),
        ('5', '16-18'),
        ('6', '18-20'),
    )
    client = models.ForeignKey(Account, on_delete=models.CASCADE)
    reserved_time = models.CharField(max_length=1, choices=TIME_CHOICES)
    reserved_day = models.DateField()


