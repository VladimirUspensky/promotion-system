from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase


User = get_user_model()


class TestModel(APITestCase):
    def test_creating_user(self):
        user = User.objects.create_user(email='u@gmail.com',
                                        phone='+79002221199',
                                        first_name='U',
                                        last_name='User',
                                        password='pass')
        self.assertIsInstance(user, User)
        self.assertEqual(user.email, 'u@gmail.com')
        self.assertFalse(user.is_staff)

    def test_creating_superuser(self):
        user = User.objects.create_superuser(email='u@gmail.com',
                                             phone='+79002221199',
                                             first_name='U',
                                             last_name='User',
                                             password='pass')
        self.assertIsInstance(user, User)
        self.assertEqual(user.email, 'u@gmail.com')
        self.assertTrue(user.is_staff)
