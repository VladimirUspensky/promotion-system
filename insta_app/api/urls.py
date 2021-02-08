from rest_framework import routers

from .views import InstagramAccountViewSet, InstagramOrderViewSet, UserViewSet


router = routers.SimpleRouter()
router.register('instagram', InstagramAccountViewSet)
router.register('make-order', InstagramOrderViewSet)
router.register('login', UserViewSet)


urlpatterns = []
urlpatterns += router.urls
