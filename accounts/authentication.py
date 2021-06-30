import jwt
from jwt import ExpiredSignatureError
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from django.contrib.auth import get_user_model


User = get_user_model()


class CustomJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization', None)
        if auth_header is None:
            return
        try:
            access = auth_header.split(' ')[1]
            payload = jwt.decode(access, settings.SECRET_KEY, algorithms=['HS256'])
        except ExpiredSignatureError:
            raise AuthenticationFailed('Access token expired')
        except IndexError:
            raise AuthenticationFailed('The prefix was missed')
        user = User.objects.filter(email=payload['email']).first()
        if user is None:
            raise AuthenticationFailed('User not found')
        return user, None
