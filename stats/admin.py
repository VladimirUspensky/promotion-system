from django.contrib import admin

from stats.models import Stats


class StatsAdmin(admin.ModelAdmin):
    list_display = ('user_account',
                    'solved_tasks_num',
                    'failed_tasks_num',
                    'created_tasks_num',
                    'total_tasks_num',
                    'earned_money',
                    'spent_money',
                    'current_balance',
                    'average_mark',
                    'reviews_num')
    list_filter = ('user_account', 'current_balance', 'average_mark', 'reviews_num', 'total_tasks_num')
    list_display_links = ('user_account',)
    list_per_page = 20


admin.site.register(Stats, StatsAdmin)
