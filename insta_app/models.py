from django.db import models
from django.contrib.auth.models import User


class InstagramAccount(models.Model):
    """
    Model of the instagram account of user
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=18, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    password = models.CharField(max_length=255)

    class Meta:
        db_constraints = {
            'field_is_not_null':
            'CHECK (username IS NOT NULL OR phone_number IS NOT NULL OR email IS NOT NULL)',
        }

    def __str__(self):
        return self.username or self.email or self.phone_number


class InstagramTask(models.Model):
    """
    Model of the instagram task
    """
    account = models.ForeignKey(InstagramAccount, on_delete=models.CASCADE)
    likes_number = models.PositiveIntegerField(blank=True, null=True)
    subscriptions_number = models.PositiveIntegerField(blank=True, null=True)
    unsubscribes_number = models.PositiveIntegerField(blank=True, null=True)
    comments_number = models.PositiveIntegerField(blank=True, null=True)
    comments_content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f'Task {self.id} of account {self.account.id}'


