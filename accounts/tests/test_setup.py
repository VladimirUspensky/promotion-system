from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase

from accounts.serializers import UserAccountSerializer

User = get_user_model()


class TestSetUp(APITestCase):
    def setUp(self) -> None:

        self.signup_data = {
            'email': 'test@gmail.com',
            'phone': '+79527770099',
            'first_name': 'Ivan',
            'last_name': 'Ivanov',
            'password': '12345678',
            'password2': '12345678'
        }
        self.signin_data = {
            'email': 'test@gmail.com',
            'password': '12345678'
        }

        self.user_account1 = User.objects.create(email='user@gmail.com',
                                                 phone='+79045556644',
                                                 first_name='Andrey',
                                                 last_name='Andreev',
                                                 password='12345678')
        self.user_account2 = User.objects.create(email='account@gmail.com',
                                                 phone='+79528572233',
                                                 first_name='Irina',
                                                 last_name='Dubkova',
                                                 password='irina_password')

        self.updated_data = {
            'phone': '+79005004000',
            'first_name': 'Alex'
        }

        self.serializer_data = {
            'id': 1,
            'email': 'user@gmail.com',
            'phone': '+79045556644',
            'first_name': 'Andrey',
            'last_name': 'Andreev',
            'stats': {
                'user_account': 1,
                'solved_tasks_num': 0,
                'failed_tasks_num': 0,
                'total_tasks_num': 0,
                'created_tasks_num': 0,
                'earned_money': 0,
                'spent_money': 0,
                'current_balance': 0,
                'average_mark': 0,
                'reviews_num': 0
            }
        }

        self.serializer = UserAccountSerializer(instance=self.user_account1)

        self.signup_url = reverse('signup')
        self.signin_url = reverse('signin')
        self.list_url = reverse('list')
        self.update_url = reverse('update', kwargs={'email': self.signup_data.get('email')})
        self.detail_url = reverse('detail', kwargs={'email': self.signup_data.get('email')})

        return super().setUp()

    def tearDown(self) -> None:
        return super().tearDown()
