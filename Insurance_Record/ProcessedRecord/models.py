from django.db import models
from datetime import date
from django.contrib.auth.models import Group
from django.db import models


class ProcessedRecord(models.Model):
    Policy_id = models.IntegerField(unique=True,null=True)
    Date_of_Purchase = models.DateField(null=True)
    Customer_id = models.IntegerField(null=True)
    Fuel = models.CharField(max_length=255, default="", null=True, blank=True)
    VEHICLE_SEGMENT = models.CharField(max_length=20, default="", null=True, blank=True)
    Premium = models.IntegerField(null=True)
    Bodily_injury_liability = models.BooleanField(default=False)
    Personal_injury_protection = models.BooleanField(default=False)
    Property_damage_liability = models.BooleanField(default=False)
    Collision = models.BooleanField(default=False)
    Comprehensive = models.BooleanField(default=False)
    Customer_Marital_status = models.BooleanField(default=False)
    Customer_Gender = models.CharField(max_length=255, default="", null=True, blank=True)
    Customer_Income_Group = models.CharField(max_length=255, default="", null=True, blank=True)
    Customer_Region = models.CharField(max_length=255, default="", null=True, blank=True)


    def __str__(self):
        return str(self.Policy_id) + "_" + str(self.Premium)