from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from api.models import Restaurant


class RestaurantViewTestCase(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()
        Restaurant.objects.create(name='Pasta', city='Wroclaw', zip_code= '50-102', street='Rynek', house_number='1',
                                  phone_number='111222333', rating=4.9)

    def test_list_restaurants(self):
        url = reverse('restaurants-list')
        response = self.client.get(url)
        assert response.status_code == 200
        assert len(response.data) == 1
