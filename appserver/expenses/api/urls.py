from django.urls import path

from .apis import (
    ExpensesList,
    ExpensesDetail,
)


urlpatterns = [
    path("expenses/", ExpensesList.as_view(), name="expenses-list"),
    path("expenses/<int:pk>/", ExpensesDetail.as_view(), name="expenses-detail"),
]
