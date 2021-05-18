from django.contrib import admin

from notifications.models import Notification


class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'task', 'from_user', 'to_user', 'send_date', 'notification_type')
    list_filter = ('id', 'task', 'send_date')
    list_display_links = ('id', 'task', 'from_user', 'to_user')
    list_per_page = 20


admin.site.register(Notification, NotificationAdmin)
