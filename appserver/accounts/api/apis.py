
from django.contrib.auth import get_user_model
# rest framework
from rest_framework.response import Response
from rest_framework import generics, permissions
# serializers
from .serializers import (
    UserSerializer,
    LoginSerializer,
)


def get_auth_token(user):

    from rest_framework_simplejwt.tokens import RefreshToken

    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


User = get_user_model()


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    permission_classes = [
        permissions.AllowAny,
    ]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        token = get_auth_token(user)

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "refresh_token": token['refresh'],
            "access_token": token['access'],
        })


class UserAPI(generics.RetrieveUpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
