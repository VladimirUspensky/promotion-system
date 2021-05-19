from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.exceptions import AuthenticationFailed

from .permissions import UserAccountUpdatePermission
from .serializers import UserAccountSerializer
from .utils import get_access_token, get_refresh_token


User = get_user_model()


class SignUpView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        request_data = self.request.data
        email = request_data['email']
        first_name = request_data['first_name']
        last_name = request_data['last_name']
        phone = request_data['phone']
        password = request_data['password']
        password2 = request_data['password2']

        if password == password2:
            if phone:
                if User.objects.filter(phone=phone).exists():
                    return Response({'Error': 'This phone already exists'})
            if User.objects.filter(email=email).exists():
                return Response({'Error': 'This email already exists'})
            if len(password) < 8:
                return Response({'Error': 'Password must be at least 8 characters'})
            user = User.objects.create_user(email=email,
                                            first_name=first_name,
                                            last_name=last_name,
                                            phone=phone,
                                            password=password)
            user.save()
            return Response({'Success': 'User created successfully'})
        else:
            return Response({'Error': 'Passwords must be the same'})


class SignInView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        email = self.request.data.get('email')
        password = self.request.data.get('password')
        response = Response()

        if email is None or password is None:
            raise AuthenticationFailed('Credentials were not provided')

        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('User not found')
        if not user.check_password(password):
            raise AuthenticationFailed('Password is wrong')

        serialized_user = UserAccountSerializer(user).data
        access = get_access_token(user)
        refresh = get_refresh_token(user)

        response.set_cookie(key='refreshtoken', value=refresh, httponly=True)
        response.data = {
            'access': access,
            'user': serialized_user
        }
        return response


class UserAccountListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserAccountSerializer
    permission_classes = (permissions.AllowAny,)


class UserAccountDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserAccountSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'email'


class UserAccountUpdateView(UpdateAPIView,
                            UpdateModelMixin,
                            UserAccountUpdatePermission):
    queryset = User.objects.all()
    serializer_class = UserAccountSerializer
    permission_classes = (UserAccountUpdatePermission,)
    lookup_field = 'email'

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
