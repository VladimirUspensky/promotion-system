import jwt
import datetime
from django.conf import settings


def get_access_token(user):
    payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=5),
        'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token


def get_refresh_token(user):
    payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=5),
        'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, settings.REFRESH_TOKEN_SECRET, algorithm='HS256')
    return token
