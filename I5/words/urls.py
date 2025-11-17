from django.urls import path
from . import views

app_name = 'words'

urlpatterns = [
    path('dictionary/', views.word_search, name='word_search'),
    path('bookmark/<int:word_id>/', views.toggle_bookmark, name='toggle_bookmark'),
]
