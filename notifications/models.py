from django.db import models

from accounts.models import UserAccount
from tasks.models import Task


class Notification(models.Model):
    class NotificationType(models.TextChoices):
        REPLY = 'reply'
        CHANGE_TASK_STATUS = 'change_task_status'
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    from_user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='notification_from_user')
    to_user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='notification_to_user')
    send_date = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    status = models.BooleanField(default=True)
    notification_type = models.CharField(max_length=30,
                                         choices=NotificationType.choices,
                                         default=NotificationType.REPLY)

    def __str__(self):
        return f'Notification to {self.to_user} on task {self.task}'
