from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated 
from django.shortcuts import get_object_or_404 
from rest_framework import status
from rest_framework.response import Response
from Reservation.models import Reservation
from Account.models import Account


class ReservationList(APIView):
    def get(self, request):
        day = self.request.query_params.get('day')
        reservation_list = Reservation.objects.filter(reserved_day=day)
        data = []
        for res in reservation_list:
            data.append({
                'id': res.id,
                'client': res.client.user.username,
                'reserved_time': res.reserved_time
            })
        return Response(data, status=status.HTTP_200_OK)



class BookReservation(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            user = self.request.user
            account = Account.objects.get(user=user)
            day = self.request.data.get('day')
            time = self.request.data.get('time')
            
            if Reservation.objects.filter(reserved_time=time, reserved_day=day).exists():
                return Response({"message": "Already reserved!"}, status=status.HTTP_306_RESERVED)
            
            Reservation.objects.create(client=account,reserved_time=time, reserved_day=day)
            return Response(status=status.HTTP_200_OK)
        except:
            return Response({"message": "Values is not acceptable"}, status=status.HTTP_400_BAD_REQUEST)



class CancelReservation(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            user = self.request.user
            account = Account.objects.get(user=user)
            day = self.request.data.get('day')
            time = self.request.data.get('time')
            
            if not Reservation.objects.filter(client=account, reserved_time=time, reserved_day=day).exists():
                return Response({"message": "This time is not reserve or you are not the owner!"}, status=status.HTTP_400_BAD_REQUEST)
            
            Reservation.objects.filter(client=account,reserved_time=time, reserved_day=day).delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response({"message": "Values is not acceptable"}, status=status.HTTP_400_BAD_REQUEST)