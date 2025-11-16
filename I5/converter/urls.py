from django.urls import path
from . import views

app_name = 'converter'
<<<<<<< HEAD

=======
>>>>>>> b7a2ddb636d476b079cd6d41e6771cac0ad7b8ec
urlpatterns = [
    path('', views.upload, name='upload'),
    path('meaning/', views.meaning, name='meaning'),
]
