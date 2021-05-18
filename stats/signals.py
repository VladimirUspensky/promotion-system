from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Stats
from reviews.models import Review
from tasks.models import Task


User = get_user_model()


@receiver(post_save, sender=User)
def user_save(sender, instance, created, **kwargs):
    if created:
        stats = Stats.objects.create(user_account=instance)
        stats.save()


@receiver(post_save, sender=Task)
def task_save(sender, instance, created, **kwargs):
    if created:
        stats = Stats.objects.filter(user_account=instance.customer).first()
        if not stats:
            stats = Stats.objects.create(user_account=instance.customer)
        stats.created_tasks_num += 1
        stats.total_tasks_num += 1
    else:
        stats = Stats.objects.filter(user_account=instance.performer).first()
        if not stats:
            stats = Stats.objects.create(user_account=instance.performer)
        if instance.status == 'done':
            stats.solved_tasks_num += 1
        elif instance.status == 'failed':
            stats.failed_tasks_num += 1
    if stats:
        stats.save()


@receiver(post_save, sender=Review)
def review_save(sender, instance, created, **kwargs):
    if created:
        stats = Stats.objects.filter(user_account=instance.to_user).first()
        if not stats:
            stats = Stats.objects.create(user_account=instance.to_user).first()
        stats.reviews_num += 1
        stats.average_mark = (stats.average_mark + float(instance.mark)) / stats.reviews_num
        stats.save()
