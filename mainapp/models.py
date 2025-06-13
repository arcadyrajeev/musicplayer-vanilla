from django.db import models

class Song(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    album_cover = models.ImageField(upload_to='static/Album Covers/')
    music_file = models.FileField(upload_to='static/music/')

    def __str__(self):
        return f'{self.title} by {self.artist}'
