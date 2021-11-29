"""ProcessedRecord URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from django.conf.urls import url
from . import views
from django.contrib.auth import views as auth_views



urlpatterns = [
    path('store_record/', views.create_record, name="create"),


    path('get_all_data/', views.get_all_dataListApiView.as_view(), name="get_all_data"),

    path('get_metrics_data/', views.get_metrics_data, name="get_all_data"),
    path('update_record/<slug:p_id>', views.update_record, name="update_record"),
    # path('payload/<slug:p_name>/<slug:date>', views.save_payload_details, name="payload"),
    # url('^data/(?P<project>[\w\ -]+)/(?P<date>[\w\ -]+)$', views.get_project_data_by_date, name="update"),

]
