from django.contrib import admin

from .models import Review


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'to_user', 'from_user', 'task', 'mark')
    list_filter = ('id', 'mark')
    list_display_links = ('id', )
    list_per_page = 20


admin.site.register(Review, ReviewAdmin)
