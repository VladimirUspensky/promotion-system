from django.contrib import admin
from .models import Task, Reply


class TaskAdmin(admin.ModelAdmin):
    list_display = ('slug', 'title', 'deadline', 'status', 'customer', 'performer')
    list_filter = ('slug', 'deadline', 'status', 'customer', 'performer')
    list_display_links = ('slug', 'title', 'status')
    list_per_page = 20


class ReplyAdmin(admin.ModelAdmin):
    list_display = ('task', 'from_user', 'send_date')
    list_filter = ('task', 'from_user', 'send_date')
    list_display_links = ('task', 'from_user')
    list_per_page = 20


admin.site.register(Task, TaskAdmin)
admin.site.register(Reply, ReplyAdmin)
