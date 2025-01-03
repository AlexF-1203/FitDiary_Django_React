from django.db import models
from django.contrib.auth.models import User

class Tracker(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='trackers'
    )
    muscle = models.CharField(max_length=100)
    performance = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.muscle} - {self.date}"