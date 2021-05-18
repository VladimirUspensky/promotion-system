from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from accounts.models import UserAccount
from tasks.models import Task


class Review(models.Model):
    to_user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='user_reviews')
    from_user = models.ForeignKey(UserAccount, on_delete=models.DO_NOTHING, related_name='published_reviews')
    task = models.ForeignKey(Task, on_delete=models.DO_NOTHING, related_name='review')
    content = models.TextField()
    mark = models.PositiveIntegerField(default=5, validators=[MinValueValidator(0), MaxValueValidator(10)])

    def __str__(self):
        return f'Review {self.pk} from {self.from_user.pk} to {self.to_user.pk}'
