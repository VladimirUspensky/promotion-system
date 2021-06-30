from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from tasks.models import Task
from .models import Chat

User = get_user_model()


@receiver(post_save, sender=Task)
def create_chat(sender, instance, created, **kwargs):
    if not created:
        name = str(instance.customer.id) + str(instance.performer.id)
        chat = Chat.objects.filter(name=name).first()
        if chat:
            return
        chat = Chat(name=name, creator=instance.customer, second_member=instance.performer)
        chat.save()
