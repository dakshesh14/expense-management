from django.contrib.auth import get_user_model

# rest framework
from rest_framework import generics, permissions
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination

from .serializers import ExpensesSerializer
from .util import IsOwnerOrReadOnly

from expenses.models import Expenses

User = get_user_model()


class ExpensesList(generics.ListCreateAPIView):
    serializer_class = ExpensesSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrReadOnly,
    ]

    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["name"]

    pagination_class = PageNumberPagination
    pagination_class.page_size = 10

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Expenses.objects.all()

        return Expenses.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ExpensesDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExpensesSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrReadOnly,
    ]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Expenses.objects.all()

        return Expenses.objects.filter(created_by=self.request.user)
