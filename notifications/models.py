from django.db import models

from accounts.models import UserAccount
from tasks.models import Task


class Notification(models.Model):
    class NotificationStatusType(models.TextChoices):
        CHECKED = 'checked'
        NOT_CHECKED = 'not_checked'
        FROZEN = 'frozen'
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    from_user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='notification_from_user')
    to_user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='notification_to_user')
    send_date = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    status = models.CharField(max_length=20,
                              choices=NotificationStatusType.choices,
                              default=NotificationStatusType.NOT_CHECKED)

    def __str__(self):
        return f'Notification to {self.to_user} on task {self.task}'
