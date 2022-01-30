from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Restaurant
from .serializers import RestaurantSerializer


class RestaurantView(viewsets.ViewSet):

    def list(self, request):
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = RestaurantSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        restaurants = Restaurant.objects.all()
        restaurant = get_object_or_404(restaurants, pk=pk)
        serializer = RestaurantSerializer(restaurant)
        return Response(serializer.data)

    def put(self, request, pk=None):
        restaurant = Restaurant.objects.get(pk=pk)
        serializer = RestaurantSerializer(restaurant, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        rental = Restaurant.objects.get(pk=pk)
        rental.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
