from django.core.exceptions import ValidationError

def validate_rating_number(value):
    if value < 1.0 or value > 5.0:
        raise ValidationError('Value must be greater or equal to 1.0 and less or equal to 5.0')
