# my_project/views.py

from django.shortcuts import render

def main(request):
    if request.user.is_authenticated:
        return render(request, 'mainLoggined.html')
    else:
        return render(request, 'mainBfLogin.html')