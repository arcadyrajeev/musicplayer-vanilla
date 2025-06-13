

from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Song  # Import your model
from django.core.files.storage import FileSystemStorage

def index(request):
    songs = Song.objects.all().order_by('?')
    return render(request, 'music.html', {'songs': songs})

def add_song(request):
    if request.method == 'POST':
        title = request.POST['title']
        artist = request.POST['artist']
        music_file = request.FILES['music_file']
        album_cover = request.FILES['album_cover']

        # Create and save the Song object
        song = Song(title=title, artist=artist, music_file=music_file, album_cover=album_cover )
        song.save()

    return HttpResponse('<h1 align=center >!! Song Uploaded !!<h1>')  # Render the form if GET request

