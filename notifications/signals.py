from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from notifications.models import Notification
from tasks.models import Reply


User = get_user_model()


@receiver(post_save, sender=Reply)
def reply_save(sender, instance, created, **kwargs):
    if created:
        to_user = User.objects.filter(email=instance.task.customer.email).first()
        notification = Notification.objects.create(task=instance.task,
                                                   from_user=instance.from_user,
                                                   to_user=to_user,
                                                   send_date=instance.send_date,
                                                   content=instance.content,
                                                   status=False)
        notification.save()
