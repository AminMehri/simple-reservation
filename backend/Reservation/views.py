from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated 
from django.shortcuts import get_object_or_404 
from rest_framework import status
from rest_framework.response import Response
from Reservation.models import Reservation


class ReservationList(APIView):
    def get(self, request):
        day = self.request.query_params.get('day')
        reservation_list = Reservation.objects.filter(reserved_day=day)
        data = []
        for res in reservation_list:
            data.appned({
                'id': res.id,
                'client': res.client.user.username,
                'reserved_time': res.reserved_time
            })
        return Response(data, status=status.HTTP_200_OK)