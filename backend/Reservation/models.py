from django.db import models
from Account.models import Account



class Reservation(models.Model):
    TIME_CHOICES = (
        ('8-10', '8-10'),
        ('10-12', '10-12'),
        ('12-14', '12-14'),
        ('14-16', '14-16'),
        ('16-18', '16-18'),
        ('18-20', '18-20'),
    )
    client = models.ForeignKey(Account, on_delete=models.CASCADE)
    reserved_time = models.CharField(max_length=5, choices=TIME_CHOICES)
    reserved_day = models.DateField()

    def __str__(self):
        return str(self.reserved_day.day) + ' / ' + self.reserved_time