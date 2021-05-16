from django.db import models
from django.template.defaultfilters import slugify
from django.utils.timezone import now

from accounts.models import UserAccount


class Task(models.Model):
    class TaskStatusType(models.TextChoices):
        DONE = 'done'
        FAILED = 'failed'
        IN_PROCESS = 'in_process'
        OPEN = 'open'
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    deadline = models.DateField()
    published_date = models.DateField(default=now)
    status = models.CharField(max_length=50, choices=TaskStatusType.choices, default=TaskStatusType.OPEN)
    payment = models.IntegerField()
    customer = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='published_tasks')
    performer = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='taken_tasks',
                                  blank=True, null=True, default=None)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'Tasks {self.slug}: {self.title})'


class Reply(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='replies')
    from_user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    content = models.TextField()
    send_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'Reply from user {self.from_user.pk} to task {self.task.pk}'
