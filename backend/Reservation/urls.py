from django.urls import path
from Reservation import views


urlpatterns = [
    path('', views.ReservationList.as_view()),
]