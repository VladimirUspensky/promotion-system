import json
from rest_framework import status

from .test_setup import TestSetUp


class TestViews(TestSetUp):
    def test_signup_success(self):
        response = self.client.post(self.signup_url, self.signup_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_signin_success(self):
        self.client.post(self.signup_url, self.signup_data)
        response = self.client.post(self.signin_url, self.signin_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_authorized_user_data(self):
        self.client.post(self.signup_url, self.signup_data)
        response = self.client.post(self.signin_url, self.signin_data)
        access_token = json.loads(response.content.decode('utf-8')).get('access')
        response = self.client.put(self.update_url, self.updated_data, HTTP_AUTHORIZATION=f'Bearer {access_token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_unauthorized_user_data(self):
        self.client.post(self.signup_url, self.signup_data)
        self.client.post(self.signin_url, self.signin_data)
        response = self.client.put(self.update_url, self.updated_data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_user_detail(self):
        self.client.post(self.signup_url, self.signup_data)
        response = self.client.post(self.signin_url, self.signin_data)
        access_token = json.loads(response.content.decode('utf-8')).get('access')
        response = self.client.get(self.detail_url, HTTP_AUTHORIZATION=f'Bearer {access_token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
