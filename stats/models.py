from django.db import models

from accounts.models import UserAccount


class Stats(models.Model):
    user_account = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='stats')
    solved_tasks_num = models.PositiveIntegerField(default=0)
    failed_tasks_num = models.PositiveIntegerField(default=0)
    total_tasks_num = models.PositiveIntegerField(default=0)
    created_tasks_num = models.PositiveIntegerField(default=0)
    earned_money = models.IntegerField(default=0)
    spent_money = models.IntegerField(default=0)
    current_balance = models.IntegerField(default=0)
    average_mark = models.FloatField(default=0)
    reviews_num = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'{self.user_account.pk} stats'
