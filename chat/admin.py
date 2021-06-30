from django.contrib import admin

from .models import Chat, Message


class ChatAdmin(admin.ModelAdmin):
    list_display = ('id',)
    list_filter = ('id',)
    list_display_links = ('id',)
    list_per_page = 20


class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'to_user', 'from_user', 'send_date')
    list_filter = ('id', 'to_user', 'from_user')
    list_display_links = ('id', 'to_user', 'from_user')
    list_per_page = 20


admin.site.register(Chat, ChatAdmin)
admin.site.register(Message, MessageAdmin)
