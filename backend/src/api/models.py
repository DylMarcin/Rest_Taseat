from django.db import models
from django.core.validators import RegexValidator

from .validators import validate_rating_number


class Restaurant(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    city = models.CharField(max_length=15)
    zip_code = models.CharField(max_length=6, validators=[RegexValidator(
        regex=r'^(^[0-9]{2}(?:-[0-9]{3})?$|^$)',
        message=(u'Kod pocztowy jest wymagany w formacie XX-XXX'),
    )])
    street = models.CharField(max_length=15)
    house_number = models.CharField(max_length=3)
    flat_number = models.CharField(max_length=3, default='0')
    phone_number = models.CharField(max_length=12)
    image = models.ImageField()
    rating = models.FloatField(validators=[validate_rating_number])

    def __str__(self):
        return f'{self.name}, {self.city}'
