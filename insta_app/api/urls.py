from rest_framework import routers

from .views import InstagramAccountViewSet, InstagramOrderViewSet


router = routers.SimpleRouter()
router.register('instagram', InstagramAccountViewSet)
router.register('make-order', InstagramOrderViewSet)


urlpatterns = []
urlpatterns += router.urls
