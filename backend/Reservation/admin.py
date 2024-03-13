from django.contrib import admin
from Reservation.models import Reservation



class ReservationAdmin(admin.ModelAdmin):
    list_display = ('client', 'reserved_time', 'reserved_day')

admin.site.register(Reservation, ReservationAdmin)