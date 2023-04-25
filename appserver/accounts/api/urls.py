from django.urls import path

from .apis import (
    UserAPI,
    LoginAPI,
)

# for refreshing the token
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    # login
    path('login/', LoginAPI.as_view()),

    # user details
    path('user/', UserAPI.as_view()),

    # refresh token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
