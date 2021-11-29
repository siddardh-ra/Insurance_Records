from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ProcessedRecord
from rest_framework.serializers import ModelSerializer


class ListProjectSerializer(ModelSerializer):
    class Meta:
        model=ProcessedRecord
        fields="__all__"

    def to_representation(self, instance):
        from base64 import b64encode
        import json
        resp= {"Policy_id": instance.Policy_id, "Date_of_Purchase": str(instance.Date_of_Purchase),
               "Customer_id": instance.Customer_id,
               "Fuel": instance.Fuel, "VEHICLE_SEGMENT": instance.VEHICLE_SEGMENT,
               "Premium": instance.Premium, "Bodily_injury_liability": instance.Bodily_injury_liability,
               "Personal_injury_protection": instance.Personal_injury_protection, "Property_damage_liability": instance.Property_damage_liability,
               "Collision": instance.Collision, "Comprehensive": instance.Comprehensive,
               "Premium": instance.Premium, "Bodily_injury_liability": instance.Bodily_injury_liability,
                "Customer_Marital_status": instance.Customer_Marital_status,
                "Customer_Gender":instance.Customer_Gender,
                "Customer_Income_Group":instance.Customer_Income_Group,"Customer_Region":instance.Customer_Region
                }
        return resp




















