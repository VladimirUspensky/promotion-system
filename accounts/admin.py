from django.contrib import admin

from .models import UserAccount


class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'phone')
    list_display_links = ('id', 'email', 'phone')
    list_filter = ('id', 'email')
    search_fields = ('id', 'email', 'phone')
    list_per_page = 20


admin.site.register(UserAccount, UserAccountAdmin)
