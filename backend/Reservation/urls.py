from django.urls import path
from Reservation import views


urlpatterns = [
    path('', views.ReservationList.as_view()),
    path('book/', views.BookReservation.as_view()),   
    path('cancel/', views.CancelReservation.as_view()),   
]