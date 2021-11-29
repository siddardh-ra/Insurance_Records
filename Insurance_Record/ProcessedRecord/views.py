from django.shortcuts import render
from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes

from .models import ProcessedRecord
import datetime

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.template.loader import get_template
from django.core.mail import EmailMultiAlternatives
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.contrib.auth.models import User, Group
from rest_framework.generics import ListAPIView
from django.core import serializers
from rest_framework.authtoken.models import Token
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.permissions import IsAuthenticated
import json
# import pandas as pd
# Create your views here.
from .serializers import *


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def create_record(request):
    print(request.data)
    # user = Token.objects.get(key='token string').user
    try:
        data = request.data
        print(data['Policy_id'])
        try:
            project = ProcessedRecord()
            temp_date=data['Date of Purchase']
            a=temp_date.split("/")# [11 ,18 ,2018]
            new_Date= a[2]+"-"+a[0]+"-"+a[1]
            project.Policy_id = data['Policy_id']
            project.Date_of_Purchase =new_Date
            # project.plant_size = data['Date of Purchase']
            project.Customer_id = data['Customer_id']
            project.Fuel = data['Fuel']
            project.VEHICLE_SEGMENT = data['VEHICLE_SEGMENT']
            project.Premium = data['Premium']
            project.Bodily_injury_liability = return_Bool(data['bodily injury liability'])
            project.Personal_injury_protection = return_Bool(data['personal injury protection'])
            project.Property_damage_liability = return_Bool(data['property damage liability'])
            project.Collision = return_Bool(data['collision'])
            project.Comprehensive = return_Bool(data['comprehensive'])
            project.Customer_Gender = data['Customer_Gender']
            project.Customer_Income_Group = data['Customer_Income group']
            project.Customer_Region = data['Customer_Region']
            project.Customer_Marital_status = return_Bool(data['Customer_Marital_status'])
            print(project)
            project.save()
            return Response({"status": "success"})
        except Exception as e:
            print(e)
            return Response({"status": "failed", "Exception": str(e)})
    except Exception as e:
        print(e)
        return Response({"status": "failed", "Exception": str(e)})


def return_Bool(vari):
    if vari == 0 or vari == "false":
        return False
    elif vari == 1 or vari == "true":
        return True


class get_all_dataListApiView(ListAPIView):
    serializer_class = ListProjectSerializer
    def get_queryset(self, *args, **kwargs):
        try:
            return ProcessedRecord.objects.all()
        except Exception as e:
            return ProcessedRecord.objects.none()


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_metrics_data(request):
    try:
        records = ProcessedRecord.objects.all()
        temp_dict ={}
        North=[]
        South=[]
        East=[]
        West=[]
        male=[]
        female=[]
        married=0
        unmarried =0
        month_list={}
        for i in records:
            resp = {"Policy_id": i.Policy_id, "Date_of_Purchase": str(i.Date_of_Purchase),
                    "Customer_id": i.Customer_id,
                    "Fuel": i.Fuel, "VEHICLE_SEGMENT": i.VEHICLE_SEGMENT,
                    "Premium": i.Premium, "Bodily_injury_liability": i.Bodily_injury_liability,
                    "Personal_injury_protection": i.Personal_injury_protection,
                    "Property_damage_liability": i.Property_damage_liability,
                    "Collision": i.Collision, "Comprehensive": i.Comprehensive,
                    "Premium": i.Premium, "Bodily_injury_liability": i.Bodily_injury_liability,
                    "Customer_Marital_status": i.Customer_Marital_status,
                    "Customer_Gender": i.Customer_Gender,
                    "Customer_Income_Group": i.Customer_Income_Group, "Customer_Region": i.Customer_Region
                    }
            try:
                month_list[i.Date_of_Purchase.month].append(resp)
            except Exception as e:
                month_list[i.Date_of_Purchase.month]=[]

            if i.Customer_Marital_status == True:
                married+=1
            if not i.Customer_Marital_status:
                unmarried+=1

            if i.Customer_Region =="North":
                North.append(resp)
            if i.Customer_Region =="South":
                South.append(resp)
            if i.Customer_Region =="East":
                East.append(resp)
            if i.Customer_Region =="West":
                West.append(resp)
            if i.Customer_Gender =="Male":
                male.append(resp)
            if i.Customer_Gender =="Female":
                female.append(resp)

        cust_region={"North":North,"South":South,"East":East,"West":West}
        cust_gender={"Male":male,"Female":female}
        marital_status={"Married":married,"Unmarried":unmarried}
        return Response({"Region":cust_region,"Gender":cust_gender,"Monthly":month_list,"Marital":marital_status})

    except Exception as e:
        print(e)
        return Response({"status": "failed", "Exception": str(e)})

@api_view(['PUT'])
@authentication_classes([])
@permission_classes([])
def update_record(request,p_id):
    data=request.data
    project = ProcessedRecord.objects.get(Policy_id=p_id)
    project.Fuel = data['Fuel']
    project.VEHICLE_SEGMENT = data['VEHICLE_SEGMENT']
    project.Premium = data['Premium']
    project.Bodily_injury_liability = return_Bool(data['Bodily_injury_liability'])
    project.Personal_injury_protection = return_Bool(data['Personal_injury_protection'])
    project.Property_damage_liability = return_Bool(data['Property_damage_liability'])
    project.Collision = return_Bool(data['Collision'])
    project.Comprehensive = return_Bool(data['Comprehensive'])
    project.Customer_Gender = data['Customer_Gender']
    project.Customer_Income_Group = data['Customer_Income_Group']
    project.Customer_Region = data['Customer_Region']
    project.Customer_Marital_status = return_Bool(data['Customer_Marital_status'])
    project.save()
    print(project.Customer_Region)
    return Response({"status": "success"})