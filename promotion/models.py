from django.db import models
from django.contrib.auth.models import User


class Review(models.Model):
    class Meta:
        unique_together = ('from_user', 'to_user')

    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='review_from')
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='review_to')
    content = models.TextField()
    grade = models.PositiveIntegerField(default=10)

    def __str__(self):
        return f'Review from User: {self.from_user.username} to User: {self.to_user.username}'


class Performer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rate = models.IntegerField(default=0)
    average_grade = models.FloatField(default=0)
    solved_tasks_num = models.PositiveIntegerField(default=0)
    failed_tasks_num = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'Performer: {self.user} with Rate: {self.rate}'


class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rate = models.PositiveIntegerField(default=0)
    average_grade = models.PositiveIntegerField(default=0)
    all_tasks_num = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'Customer: {self.user} with Rate: {self.rate}'


class Task(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField()
    payment = models.IntegerField()
    deadline = models.DateTimeField()

    def __str__(self):
        return f'Task: {self.name} with Payment: {self.payment}'


class Tag(models.Model):
    name = models.CharField(max_length=200)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f'Tag: {self.name}'


class Deal(models.Model):
    performer = models.ForeignKey(Performer, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, blank=True, null=True)
    start_deal = models.DateTimeField(auto_now_add=True)
    end_deal = models.DateTimeField()

    def __str__(self):
        return f'Deal between Customer: {self.customer.user.username} and ' \
               f'Performer: {self.performer.user.username} ' \
               f'on Task: {self.task.name}'


class Message(models.Model):
    performer = models.ForeignKey(Performer, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    content = models.TextField()
    send_date = models.DateTimeField(auto_now_add=True)
    is_edited = models.BooleanField(default=False)

    def __str__(self):
        return f'Message of Customer: {self.customer} and Performer: {self.performer} that sent {self.send_date}'
