from django.db import models


class InstagramAccount(models.Model):
    """
    The model of the user account to be used for promotion,
    which is connected by the user himself after registration
    """
    __tablename__ = 'instagram_account'
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
        return self.username or self.phone_number or self.email


class InstagramOrder(models.Model):
    """
    User order model to promote his account
    """
    __tablename__ = 'order'
    client = models.ForeignKey(InstagramAccount, on_delete=models.CASCADE)
    likes_number = models.PositiveIntegerField(blank=True, null=True)
    subscriptions_number = models.PositiveIntegerField(blank=True, null=True)
    comments_number = models.PositiveIntegerField(blank=True, null=True)
    unsubscribes_number = models.PositiveIntegerField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Order {self.id} of client {self.client.id}'

