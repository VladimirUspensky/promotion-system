from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser, BaseUserManager
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class UserAccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, phone=None, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, phone=phone)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, first_name, last_name, password):
        if not email:
            raise ValueError('Superusers must have an email')
        user = self.create_user(email, first_name, last_name, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    phone = PhoneNumberField(null=True, blank=True, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return f'{self.first_name} {self.last_name} - {self.email}'

    def get_short_name(self):
        return f'{self.email}'

    def __str__(self):
        return f'{self.first_name} {self.last_name} {self.email}'
