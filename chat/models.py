from django.contrib.auth import get_user_model
from django.db import models

from accounts.models import UserAccount


User = get_user_model()


class Message(models.Model):
    from_user = models.ForeignKey(UserAccount, on_delete=models.DO_NOTHING, related_name='from_user')
    to_user = models.ForeignKey(UserAccount, on_delete=models.DO_NOTHING, related_name='to_user')
    content = models.TextField()
    send_date = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ('send_date',)

    def __str__(self):
        return f'Message from {self.from_user.pk} to {self.to_user.pk}'


class Chat(models.Model):
    name = models.CharField(max_length=100, unique=True, default='room')
    creator = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='chat_first_member')
    second_member = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='chat_second_member')
    messages = models.ManyToManyField(Message, blank=True, related_name='chat')

    def __str__(self):
        return f'{self.pk}'
